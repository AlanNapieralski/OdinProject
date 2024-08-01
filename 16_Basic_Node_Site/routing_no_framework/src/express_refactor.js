import express from 'express'
import fs from 'fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'url'

async function initialisePages() {
  const indexURL = new URL("https://localhost:8000/")
  const aboutURL = new URL('/about', 'https://localhost:8000/')
  const contactURL = new URL('/contact-me', 'https://localhost:8000/')

  const index = {
    html: await readHTML('./pages/index.html'),
    url: indexURL
  }

  const about = {
    html: await readHTML('./pages/about.html'),
    url: aboutURL
  }

  const contactme = {
    html: await readHTML('./pages/contact-me.html'),
    url: contactURL
  }

  const error = {
    html: await readHTML('./pages/404.html'),
    url: null
  }

  return { index, about, contactme, error }
}

async function readHTML(path) {
  try {
    const data = await fs.readFile(path, { encoding: 'utf8' })
    return data
  } catch (err) {
    console.error(err)
  }
}

const app = express()
const { index, about, contactme, error } = await initialisePages()

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

// templating engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get('/', (req, res) => {
  res.send(index.html)
})
app.get('/about', (req, res) => {
  res.render('about', { message: 'Hello, this is the about me page using the express templates' })
})
app.get('/contactme', (req, res) => res.send(contactme.html))
app.use((req, res, next) => {
  res.status(404).send(error.html);
});


const PORT = 3000
app.listen(PORT, () => console.log(`My first express app. Listening to port ${PORT}`))

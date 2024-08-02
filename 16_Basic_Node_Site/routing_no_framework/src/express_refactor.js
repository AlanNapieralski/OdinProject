import express from 'express'
import fs from 'fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

// templating engine
app.set("views", path.join(__dirname, 'views'))
app.set("view engine", "ejs")

const links = [
  { href: '/', text: 'Home' },
  { href: 'about', text: 'About' },
  { href: 'contact-me', text: 'Contact me' },
]

app.get('/', (req, res) => {
  res.render('main', { message: 'Hello, this is the main page of my website', links: links })
})
app.get('/about', (req, res) => {
  res.render('main', { message: 'Hello, this is the about me page using the express templates', links: links })
})
app.get('/contact-me', (req, res) => {
  res.render('main', { message: 'Pls contact me lol', links: links })
})
app.use((req, res, next) => {
  res.status(404).send(error.html);
});


const PORT = 3000
app.listen(PORT, () => console.log(`My first express app. Listening to port ${PORT}`))

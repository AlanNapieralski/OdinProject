import http from 'node:http'
import fs from 'node:fs/promises'
import { URL } from 'node:url';

async function readHTML(path) {
  try {
    const data = await fs.readFile(path, { encoding: 'utf8' })
    return data
  } catch (err) {
    console.error(err)
  }
}

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

const server = http.createServer(async (req, res) => {
  try {
    const url = req.url
    const { index, about, contactme, error } = await initialisePages()

    if (url === index.url.pathname) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(index.html)
    }
    else if (url === about.url.pathname) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(about.html)
    }
    else if (url === contactme.url.pathname) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(contactme.html)
    }
    else {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.write(error.html || 'Page not found'); // Default message if error.html is null
    }
  } catch (err) {
    console.log(err)
  }
})

server.listen(8000)

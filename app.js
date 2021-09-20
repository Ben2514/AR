const express = require('express')
const https = require('https')
const fs = require('fs')
const app = express()

const SSL_PORT = 443
const IP = '192.168.0.111'

const key = fs.readFileSync('./cert/key.pem')
const cert = fs.readFileSync('./cert/cert.pem')
var credentials = {
  key: key,
  cert: cert
}
https.createServer(credentials, app).listen(SSL_PORT, IP, function() {
  console.log(`https port:${SSL_PORT}`);
})

// app.use(express.static(`${__dirname}/src`))
app.use(express.static(`${__dirname}/dist`))

// app.get('/', (req, res) => {
//   res.sendFile(`${__dirname}/index.html`)
// })
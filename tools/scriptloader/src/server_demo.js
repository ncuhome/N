const http = require('http')

let server = http.createServer((req, res) => {
  let data = JSON.stringify({
    urls: ['http://localhost:2222/']
  })
  res.writeHead(200, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With',
    'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS'})
  res.end(data)
})

server.listen(2222)

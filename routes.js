const fs = require('fs');

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  
  if (url === '/') {
    res.write('<html>');
    res.write('<head><title>Enter message</title></head>');
    res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
    res.write('</html>');
    return res.end();
  }

  if (url === '/message' && 'POST') {
    const body = [];

    req.on('data', (chunk) => {
      console.log('chunk: ', chunk);
      body.push(chunk);
    });

    req.on('end', () => {
      const parseBody = Buffer.concat(body).toString();
      const message = parseBody.split('=')[1];
      fs.writeFile('message.txt', decodeURI(message), (err) => {
        if (err) {
          console.log('error: ', err);
          res.statusCode = 302;
          res.setHeader('Location', '/'); // Definimos aquí la redirección
          return res.end();
        }
      });
    });

    // Express JS hace este trabajo de forma más sencilla
  }
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>My first page</title></head>');
  res.write('<body><h1>Something strange</h1></body>');
  res.write('</html>');
  res.end();
}

module.exports = requestHandler;


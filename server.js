/*jshint esversion: 6 */
const http = require('http');
const  fs = require('fs');
const querystring = require('querystring');
const process = require('process');

const server = http.createServer((request, response) => {
  const { headers, method, url } = request;
  request.setEncoding('utf8');
  let body = [];
  request.on('data', (chunk) => {
    body.push(chunk);
  }).on('end', () =>{
  var elements = querystring.parse(body[0]);
  console.log(elements);
  var elementWebPage = `<!DOCTYPE html><html lang="en">
<head>
  <meta charset="UTF-8">
  <title>The Elements - ${elements.elementName}</title>
  <link rel="stylesheet" href="/css/styles.css">
</head>
<body>
  <h1>${elements.elementName}</h1>
  <h2>${elements.elementSymbol}</h2>
  <h3>${elements.elementAtomicNumber}</h3>
  <p>${elements.elementDescription}</p>
  <p><a href="/">back</a></p>
</body>
</html>`;
var fileName = request.url;
fs.writeFile(`./public/${fileName}`, elementWebPage, () =>{

});
  });



  // response.write('something', 'utf8', () =>{
  //   response.end();
  //   });

});

server.listen(8080, () =>{
  console.log('server running');
});
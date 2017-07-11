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

    //get method somehow
    //add branching here for different methods and enclose bottom under POST

    //for GET: check if file exists
      //if so, get and return page
      //else return 404 error page.

    //might need to adjust response and its .write for this.

    var elements = querystring.parse(body[0]);
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
    fs.open(`./public/${fileName}`, 'r', (err) => {
      if(err){
        console.log(err);
        fs.writeFile(`./public/${fileName}`, elementWebPage, () =>{
        });
      }else{
        console.log('file already exists');
      }
    });
  });

/*The http server will respond to the POST request with an http response code 200, content type of `application/json`, and content body of `{ "success" : true }`
*/response.write('something', 'utf8', () =>{
  response.end();
  });


});

server.listen(8080, () =>{
  console.log('server running');
});
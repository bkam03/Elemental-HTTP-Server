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
    var fileName = request.url;
    switch( request.method ) {
      case 'GET':
        //for GET: check if file exists
        fs.open(`./public/${fileName}`, 'r', (err) => {
          if(err){
            console.log( '@@@@@@@' );
            //handle file doesnt exist here
            //return 404 error page.
          }else{
            //get and return page
            console.log( 'page exists' );
            let fileBeingRead = fs.readFile( `./public/${fileName}`, function( err, data ){
              console.log( data.toString() );
              response.writeHead(200, 'Successful', {
                'Content-Type': 'application/json',
              });
              response.write(`${data}`, 'utf8', () =>{
                response.end();
              });
            } );


          }
        });

        //might need to adjust response and its .write for this.
        console.log( 'GET method' );
        break;
      case 'POST':
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

        fs.open(`./public/${fileName}`, 'r', (err) => {
          if(err){
            console.log(err);
            fs.writeFile(`./public/${fileName}`, elementWebPage, () =>{
            });
          }else{
            console.log('file already exists');
          }
        });
        response.writeHead(200, 'Successful', {
          'Content-Type': 'application/json',
        });
        response.write(`{ "success" : true }`, 'utf8', () =>{
          response.end();
        });
        break;
      default:
        console.log( 'other' );
        break;
    }

  });




});

server.listen(8080, () =>{
  console.log('server running');
});
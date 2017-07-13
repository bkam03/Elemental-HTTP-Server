/*jshint esversion: 6 */
const http = require('http');
const  fs = require('fs');
const querystring = require('querystring');
const process = require('process');

function updateIndexPage( fileName ){
  let ignorePages = [ '.keep', '404.html', 'index.html' ];
  let pages = fs.readdir( './public', function( err, files ){
    let indexOfPages = '';
    for( var i = 0; i < files.length; i++ ){
      console.log( files[ i ]);
      if( ignorePages.indexOf( files[ i ] ) === -1 ){
        indexOfPages +=
        `<li>
          <a href="/${ files[ i ] }">${ files[ i ] }</a>
        </li>`;
      }
    }
    let indexHTML =
    `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>The Elements</title>
        <link rel="stylesheet" href="/css/styles.css">
      </head>
      <body>
        <h1>The Elements</h1>
        <h2>These are all the known elements.</h2>
        <h3>There are ${ files.length - 3 }</h3>
        <ol>
          ${ indexOfPages }
        </ol>
      </body>
    </html>`;
    fs.writeFile(`./public/index.html`, indexHTML, function(){
    } );
  } );
}

const server = http.createServer((request, response) => {
  request.setEncoding('utf8');
  var body = [];
  request.on('data', (chunk) => {
    body.push(chunk);
  }).on('end', () =>{
    var fileName = request.url;
    switch( request.method ) {
      case 'GET':
        fs.open(`./public/${fileName}`, 'r', (err) => {
          if(err){
            response.writeHead(404, 'Not Found', {
                'Content-Type': 'application/json',
            });
            fs.readFile( './public/404.html', function( err, data ){
              response.write(`${data}`, 'utf8', () =>{
                response.end();
              });
            } );
          } else{
            console.log( 'page exists' );
            fs.readFile( `./public/${fileName}`, function( err, data ){
              response.writeHead(200, 'Successful', {
                'Content-Type': 'application/json',
              });
              response.write(`${data}`, 'utf8', () =>{
                response.end();
              });
            } );
          }
        });
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
            console.log( 'new file' );
            fs.writeFile(`./public/${fileName}`, elementWebPage, function(){
              response.writeHead(200, 'Successful', {
                'Content-Type': 'application/json',
              });
              response.write(`{ "success" : true }`, 'utf8', () =>{
                response.end();
              });
            } );

          }else{
            console.log('file already exists');
          }
        });
        updateIndexPage( fileName );
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
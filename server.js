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
     // console.log(body);
  }).on('end', () =>{
    console.log(querystring.parse(body[0]));
  });
  console.log(request.url);
  // response.write('something', 'utf8', () =>{
  //   response.end();
  //   });

});

server.listen(8080, () =>{
  console.log('server running');
});
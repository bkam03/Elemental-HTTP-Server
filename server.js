/*jshint esversion: 6 */
const http = require('http');
const  fs = require('fs');
const querystring = require('querystring');

const server = http.createServer((request, response) => {

  console.log(request.method);
  response.write('something', 'utf8', () =>{
    response.end();
    });

});

server.listen(8080, () =>{
  console.log('server running');
});
/*jshint esversion: 6 */
const http = require('http');
const  fs = require('fs');

const server = http.createServer((request, response) => {
  console.log(request.method);
});

if(request.url === '/'){
  fs.readFile('/index.html');
}
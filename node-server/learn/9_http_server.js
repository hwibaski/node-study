const http = require('node:http');

/**
 * 요청 방법
 * curl -X POST http://localhost:8080/echo -d '{"key1":"value1", "key2":"value2"}'
 */


http
    .createServer((request, response) => {
        request.on('error', err => {
            console.error(err);
            response.statusCode = 400;
            response.end();
        });
        response.on('error', err => {
            console.error(err);
        });
        if (request.method === 'POST' && request.url === '/echo') {
            request.pipe(response);
        } else {
            response.statusCode = 404;
            response.end();
        }
    })
    .listen(8080);
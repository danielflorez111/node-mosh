const http = require('http');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.write('Hola');
        res.end();
    }

    if (req.url === '/api') {
        res.write('Hola API');
        res.end();
    }
});

server.listen(3000);

console.log('Listening on port 3000...');
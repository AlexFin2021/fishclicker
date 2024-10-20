const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = '0.0.0.0'; // Listen on all network interfaces
const port = 3000; // You can choose any port number

const server = http.createServer((req, res) => {
    // Determine the file path based on the request URL
    let filePath = '.' + req.url; // Get the requested file path
    if (filePath === './') {
        filePath = './index.html'; // Serve index.html for root requests
    }

    const extname = String(path.extname(filePath)).toLowerCase(); // Get the file extension
    let contentType = 'text/html'; // Default content type

    // Determine content type based on file extension
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.gif':
            contentType = 'image/gif';
            break;
        case '.svg':
            contentType = 'image/svg+xml';
            break;
        default:
            contentType = 'text/html'; // Default to HTML if not recognized
            break;
    }

    // Read the file and send it in response
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code == 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 Not Found</h1>', 'utf-8');
            } else {
                res.writeHead(500);
                res.end('Sorry, there was an error: ' + error.code + ' ..\n', 'utf-8');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

const http = require('http');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const port = process.env.PORT || 3000;

http.createServer((req, res) => {
    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './menu.html';
    }

    // Special case for ionicons
    if (req.url.startsWith('/ionicons/')) {
        filePath = './node_modules/ionicons/dist/ionicons/' + req.url.replace('/ionicons/', '');
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'application/javascript',
        '.css': 'text/css',
        '.mjs': 'application/javascript',
    };

    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not Found');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
}).listen(port, () => {
    console.log(`Server running on port ${port}`);
});

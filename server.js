const http = require('http');
const router = require('./routers/router')
const hostname = '127.0.0.1';
const port = 3000;
const server = http.createServer((req, res) => {
    var url = req.url; 
    var method = req.method;
    for (let index = 0; index < router.length; index++) {
        let element = router[index];
        if(url === element.url && method === element.method) { 
            return element.handle(req, res)
        } 
    }
});
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
})
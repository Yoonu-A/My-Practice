/*const http=require("http");
const server=http.creatserver((req,res)=>
{
    res.writeHead(200,
        {
            "content-type":"text/plain"
        });

        res.end("Hello From Node.js Server!");
});

server.listen(3000,()=>
{
    console.log("server running at http://localhost:3000");
});*/

const http = require("http");

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        "Content-Type": "text/plain"
    });

    res.end("Hello From Node.js Server!");
});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
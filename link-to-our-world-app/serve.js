var FS = require("fs");
var http = require("http");
var serveStatic = require("serve-static");

// Serve up dist folder
var serve = serveStatic("dist");

// Create server
var server = http.createServer(function onRequest(req, res) {
  serve(req, res, () => {
    FS.readFile("dist/index.html", (err, buf) => {
      res.setHeader("Content-Type", "text/html");
      res.end(buf);
    });
  });
});

// Listen
server.listen(process.env.PORT);

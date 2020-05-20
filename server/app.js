const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const net = require("net");
const publicIp = require("public-ip");

  app.use(cors());
  app.options("*", cors());

  app.get("/getWords", async (req, res) => {
    const fileAddr = path.join(__dirname, "dictionary.txt");
    fs.readFile(fileAddr, "utf8", (err, data) => {
      
      const wordList = data.split("\n");
      res.send(wordList);
    });
  });

  app.listen(port, () =>
    console.log(`Example app listening at http://0.0.0.0:${port}`),
  );

  var server = net.createServer(function (socket) {
    socket.write("Echo server\r\n");
    socket.pipe(socket);
    socket.on("data", (data) => {
      console.log(data.toString());
    });
    socket.on("error", (err) =>
      console.log("Caught flash policy server socket error: " + err),
    );
  });

  server.listen(1337, '0.0.0.0');

  

app.get("/getExternalIp", async (req, res) => {
    const fileAddr = path.join(__dirname, "dictionary.txt");
    fs.readFile(fileAddr, "utf8", (err, data) => {
      publicIp.v4().then((ip) => {
        res.send(ip);
      });
    });
});


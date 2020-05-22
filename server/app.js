const path = require("path");
const fs = require("fs");
const express = require("express");
const http =require("http");
const cors = require('cors');
const app = express();
app.use(cors());
const server = http.createServer(app);
server.listen(3000);
const socket = require("socket.io")(server, {
    handlePreflightRequest: (req, res) => {
        const headers = {
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Access-Control-Allow-Origin": '*.*', //or the specific origin you want to give access to,
            "Access-Control-Allow-Credentials": true
        };
        res.writeHead(200, headers);
        res.end();
    }
});

const myClientList = [];
let clientCounter = 0;


socket.on("connection", (socket) => {

  const changeTurn  = () => {
    socket.broadcast.emit("yourTurn", myClientList[clientCounter%(myClientList.length)]);
    clientCounter++;
  };
  socket.on("disconnect", (socket) => {
    delete myClientList[socket.id];
  });
  
  socket.on("newPlayer", name => {
    console.log(name)
    myClientList.push(name);
  })

  
  socket.on("startGame", () => {
    console.log({myClientList, clientCounter})
    changeTurn()
  })
  
  socket.on("changeRows", rows => {
    socket.emit("newRows", rows);
    changeTurn()
  })
  
  socket.on("comeon", message => {
    console.log(message)
  })

})
socket.on('connect', function(){
  console.log("connected")
});

    

  app.get("/getWords", async (req, res) => {
    const fileAddr = path.join(__dirname, "dictionary.txt");
    fs.readFile(fileAddr, "utf8", (err, data) => {
      
      const wordList = data.split("\n");
      res.send(wordList);
    });
  });


app.post("/getRows", async(req,res) => {
  const fileAddr = path.join(__dirname, "rows.txt");
    fs.readFile(fileAddr, "utf8", (err, data) => {
      const rowsJson = JSON.parse(data);
      res.send(rowsJson);
    });
})

  

app.post("/writeRows", async(req,res) => {
  const { rows } = req.body;
  const fileAddr = path.join(__dirname, "rows.txt");
    fs.writeFile(fileAddr, JSON.stringify(rows), (err, data) => {
      res.send("writed");
    });
})  


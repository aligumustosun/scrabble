const express = require("express");
const app = express();
const port = 3000;
const path = require('path')
const fs = require('fs')
const cors = require('cors')


app.use(cors());
app.options('*', cors());

app.get("/getWords", async(req, res) => {
  const fileAddr = path.join(__dirname, 'dictionary.txt');  
  fs.readFile(fileAddr, 'utf8', (err,data) => {
    const wordList = data.split('\n');
    res.send(wordList)
  })
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`),
);

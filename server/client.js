var net = require('net');
const app = express();
const port = 3000;
const path = require('path')
const cors = require('cors')
const net = require('net');


app.use(cors());
app.options('*', cors());

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`),
);


var client = new net.Socket();


client.connect(1337, '127.0.0.1', function() {
	console.log('Connected');
	client.write('Hello, server! Love, Client.');
});


app.get("/sendWord", async(req, res) => {
  client.write({type: "sendWord", word: req.query.word})
});


client.on('data', function(data) {
	console.log('Received: ' + data);
	client.destroy(); // kill client after server's response
});

client.on('close', function() {
	console.log('Connection closed');
});
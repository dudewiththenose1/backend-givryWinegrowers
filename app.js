const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes');
const cors = require('cors');
const http = require('http');

const port = 8000;


app.use(bodyParser.json());
app.use(cors());
app.use('/', routes);
app.use(express.static('public'));

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
/*
const wsServer = new webSocketServer({
    httpServer: server
});

let counter = 0;

const clients = {};

// This code generates unique userid for everyuser.
const getUniqueID = () => {
    const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    return s4() + s4() + '-' + s4();
};

wsServer.on('request', function (request) {
    var userID = getUniqueID();

    // You can rewrite this part of the code to accept only the requests from allowed origin
    const connection = request.accept(null, request.origin);
    clients[userID] = connection;

    connection.on('message', function (message) {
        if (message.utf8Data === 'increment') {
            counter++;
            // broadcasting message to all connected clients
            for (key in clients) {
                clients[key].send(JSON.stringify({ type: 'counter', value: counter }));
            }
        } else {
            for (key in clients) {
                clients[key].send(JSON.stringify({ type: 'sendcounter', value: counter }));
            }
        }

    })
});
*/
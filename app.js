const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes');
const cors = require('cors');
const http = require('http');

const port = process.env.PORT || 8000;


app.use(bodyParser.json());
app.use(cors());
app.use('/api', routes);
app.use('/images', express.static('public/images'));

app.use(express.static('public'));

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

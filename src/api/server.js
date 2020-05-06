//imports
var express = require('express');
var db_module = require('./database/database');
var functions = require('./routes/userCtrl');
//instantiate server
var server = express();

//Parse Requests
const bodyParser = require("body-parser")
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))

server.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
    res.append('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    next();
});

//bdd deployement
var db = db_module.deploy();

//configure routes
var users = db.collection('UserCollection')

server.get("/Users/:id", (req, res) => {
    functions.findUser(req, res, users)
})

server.delete("/Users/:id", (req, res) => {
    functions.deleteUser(req, res, users)
})

server.post("/Users", (req, res) => {
    functions.addUser(req, res, users)
})

server.get("/Users_GET", (req, res) => {
    users.find().toArray()
        .then(items => res.json(items))
});

server.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h1> Server deployed </h1>');
});

server.post("/Connect", (req, res) => {
    functions.connectUser(req, res, users);
});

server.post("/isConnect", (req, res) => {
    console.log("requête de connexion")
    functions.isConnect(req, res);
})

//launch server
server.listen(3000, function() {
    console.log('Seveur listenning');
});
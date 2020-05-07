//imports
var express = require('express');
var db_module = require('./database/database');
var functions = require('./routes/userCtrl');
var friends = require('./routes/friendCtrl');
var positions = require('./routes/locCtrl');
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

//Users

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
});
//friend
server.get("/friends", (req, res) => {
    console.log("okok")
    friends.getFriends(req, res);
});
server.post("/addFriend", (req, res) => {
    //send a friend request
    friends.addFriend(req, res);
});
server.post("/friendRequestReply", (req, res) => {
    friends.friendRequestReply(req, res);
});

//Position

server.get("/date", (req, res) => {
    console.log("date")
    positions.getHistDate(req, res);
});

server.get("/lat", (req, res) => {
    console.log("lattitude")
    positions.getHistLat(req, res);
});

server.get("/long", (req, res) => {
    console.log("longitude")
    positions.getHistLong(req, res);
});

//Sauvegarder current position (marche si la durée + la date d'activation est inférieur a la date actuelle)

server.post("/savePos", (req, res) => {
    positions.addPosition(req, res);
});

//Supprimer une position

server.delete("/Pos/:date", (req, res) => {
    positions.deletePosition(req, res, users)
})

//launch server
server.listen(3000, function() {
    console.log('Seveur listenning');
});
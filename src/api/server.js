//imports
var express = require('express');
var db_module = require('./database/database');
var test = require('./test/test');
var functions = require('./functions/functions')

//instantiate server
var server = express();

//Parse Requests
const bodyParser = require("body-parser")
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: false }))

//launch server
server.listen(8080, function() {
    console.log('Seveur listenning');
});

//bdd deployement
var db = db_module.deploy();

//configure routes
var users = db.collection('UserCollection')

server.get("/Users/:id", (req, res) => {
  functions.findUser(req,res,users)
})

server.delete("/Users/:id", (req, res) => {
  functions.deleteUser(req,res,users)
})

server.post("/Users", (req,res) => {
  functions.addUser(req,res,users)
})

server.get("/Users", (req, res) => {
  users.find().toArray()
    .then(items => res.json(items))
});

server.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h1> Server deployed </h1>');
});



//test add new user
test.test1();

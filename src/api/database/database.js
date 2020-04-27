//imports
var mongoose = require('mongoose');
var md = require('./model/User_model');

// function of deployment 

exports.deploy = function() {

    var url = 'mongodb://localhost:27017/friend-finder'

    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        // we're connected!
        console.log("database connected");
    });

    // create collections based on schema 

    db.createCollection('User_Collection');
    var collection = db.collection('UserCollection');
    var modele = md.user_model();

    modele.createCollection().then(function(collection) {
        console.log('Collection is created!');
    });
}
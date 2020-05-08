//imports
var mongoose = require('mongoose');
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

    db.createCollection('UserCollection')
        .then(function(userCollection) {
            console.log('UserCollection is created!'); // Check model/UserCollection to see the model of user
        });


    db.createCollection('PositionCollection')
        .then(function(userCollection) {
            console.log('PositionCollection is created!'); // Check model/PositionCollection to see the model of position 
        });

    return db;
}
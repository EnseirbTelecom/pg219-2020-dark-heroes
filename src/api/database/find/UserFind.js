// imports
var mongoose = require('mongoose');

// function

var db = mongoose.connection;
var collection = db.collection('UserCollection');

//exports

exports.getUserByEmail = async function(email) {
    const user = await collection.findOne({ email: email });
    return (user);

}

exports.getUserByPseudo = async function(pseudo) {
    const user = await collection.findOne({ pseudo: pseudo });
    return (user);

}
// imports
var mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID

// function

var db = mongoose.connection;
var positionCollection = db.collection('PositionCollection');
var userCollection = db.collection('UserCollection');

//exports

exports.deleteUserById = async function(id) {
    const del = userCollection.deleteOne({ _id: ObjectID(id) });
}

exports.deletePositionByEmail = async function(email) {
    const del = positionCollection.deleteOne({ email: email });
}
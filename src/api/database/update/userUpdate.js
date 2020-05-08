// imports
var mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID

// function

var db = mongoose.connection;
var collection = db.collection('UserCollection');

//exports

exports.updateUser = async function(id, update) {
    const filter = { _id: ObjectID(id) };
    const UserUp = await collection.updateOne(filter, { $set: update });
}
// imports
var mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID

// function

var db = mongoose.connection;
var collection = db.collection('PositionCollection');

//exports

exports.updatePosition = async function(id, update) {
    const filter = { _id: ObjectID(id) };
    const PosUp = await collection.updateOne(filter, { $set: update });
    console.error();
}
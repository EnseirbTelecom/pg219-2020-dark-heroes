// imports
var mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID

// function

var db = mongoose.connection;
var collection = db.collection('PositionCollection');

//exports

exports.findPositionByEmail = async function(email) {
    const position = await collection.findOne({ email: email });
    console.log(position);
    return position;
}

exports.findFriendsPosition = async function(friends) {
    const positions = await collection.find({
        email: { $in: ["vt"] }
    });
    return positions.toArray();
}
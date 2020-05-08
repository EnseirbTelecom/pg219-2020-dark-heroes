//Imports
var mongoose = require('mongoose');

var schema = mongoose.Schema;

var position = new schema({
    email: String,
    pseudo: String,
    lat: String,
    long: String,
    date: String,
    duration: String,
    message: String,
});


exports.position_schema = function() {
    return position;
};
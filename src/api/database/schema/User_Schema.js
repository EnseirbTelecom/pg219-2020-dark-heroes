//Imports
var mongoose = require('mongoose');

var schema = mongoose.Schema;

var User = new schema({
    email: String,
    password: String,
    first_name: String,
    last_name: String,
    pseudo: String,
    birthday: String,
    gender: String,
    current_lat: String,
    current_long: String,
    activation_date: String,
    duration: Number,
    hist_lat: [String],
    hist_long: [String],
    hist_date: [String],
    friends: [String],
    friend_requests: [String],
    friend_pending: [String]

});

exports.user_schema = function() {
    return User;
};
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
    friends: [String],
    friend_requests: [String],
    friend_pending: [String]

});

exports.user_schema = function() {
    return User;
};
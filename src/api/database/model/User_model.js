//imports
var schem = require('../schema/User_Schema');
var mongoose = require('mongoose');

//model
var userSchema = schem.user_schema();
var model = mongoose.model('UserCollection', userSchema);

exports.user_model = function() {
    return model;
};

exports.user_init = function() {
    var user = new model();
    user.email = null;
    user.password = null;
    user.first_name = null;
    user.last_name = null;
    user.birthday = null;
    user.gender = null;
    user.current_lat = null,
    user.current_long = null,
    user.activation_date = null,
    user.duration = null,
    user.hist_lat = [],
    user.hist_long = [],
    user.hist_date = [],
    user.friends = [];
    user.friend_requests = [];
    user.friend_pending = [];

    return (user);


};
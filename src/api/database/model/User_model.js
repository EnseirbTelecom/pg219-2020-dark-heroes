//imports
var schem = require('../schema/User_Schema');
var mongoose = require('mongoose');

//model
var userSchema = schem.user_schema();
var model = mongoose.model('User', userSchema);

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

    return (user);


};
//imports 
var mongoose = require('mongoose');
var md = require('../database/model/User_model');

// tests 

exports.test1 = function() {
    var db = mongoose.connection;
    var collection = db.collection('UserCollection')
    var userTest = md.user_init();
    userTest.email = 'test';
    userTest.last_name = 'jean';
    userTest.birthday = null;
    collection.insertOne(userTest);
}
// imports
var mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID
var modPos = require('../model/Position_model');
var modUser=require('../model/User_model');
var utils= require('../../utils/jwt.utils');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

// function

var db = mongoose.connection;
try{
var User_collection = db.collection('UserCollection');
}
catch{}
// exports 

exports.getDbDemo=function(){

var user1=modUser.user_init();
bcrypt.hash('mdp', 5, function(err, bcryptedPassword) {
    user1.email = 'valentin@gmail.com';
    user1.first_name = 'Ternisien';
    user1.last_name = 'Valentin';
    user1.birthday = '13/02/1998';
    user1.gender = 'male';
    user1.pseudo = 'val';
    user1.password = bcryptedPassword;
    // user1.friends.push({email: "alice@gmail.com",
    //     pseudo: "alice",
    //     first_name: "Test",
    //     last_name:  "Alice",
    //     birthday: "1/10/1998",
    //     gender: "female"});
    //     user1.friends.push({email: 'bob@gmail.com',
    //         pseudo: 'bob',
    //         first_name: 'Test',
    //         last_name:  'Bob',
    //         birthday: '1/06/1995',
    //         gender: 'male'});
    //         user1.friends.push({email: 'victoria@gmail.com',
    //             pseudo: 'vic',
    //             first_name: 'Test',
    //             last_name:  'Victoria',
    //             birthday: '12/05/1995',
    //             gender: 'female'});
    User_collection.insertOne(user1);
})

var user2=modUser.user_init();
bcrypt.hash('mdp', 5, function(err, bcryptedPassword) {
    user2.email = 'alice@gmail.com';
    user2.first_name = 'Test';
    user2.last_name = 'Alice';
    user2.birthday = '1/10/1998';
    user2.gender = 'female';
    user2.pseudo = 'alice';
    user2.password = bcryptedPassword;
    User_collection.insertOne(user2);
})


var user3=modUser.user_init();
bcrypt.hash('mdp', 5, function(err, bcryptedPassword) {
    user3.email = 'bob@gmail.com';
    user3.first_name = 'Test';
    user3.last_name = 'Bob';
    user3.birthday = '1/06/1995';
    user3.gender = 'male';
    user3.pseudo = 'bob';
    user3.password = bcryptedPassword;
    User_collection.insertOne(user3);
})

var user4=modUser.user_init();
bcrypt.hash('mdp', 5, function(err, bcryptedPassword) {
    user4.email = 'victoria@gmail.com';
    user4.first_name = 'Test';
    user4.last_name = 'Victoria';
    user4.birthday = '12/05/1997';
    user4.gender = 'female';
    user4.pseudo = 'Vic';
    user4.password = bcryptedPassword;
    User_collection.insertOne(user4);
})
}
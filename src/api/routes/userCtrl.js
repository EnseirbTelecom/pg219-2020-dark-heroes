//import
const ObjectID = require('mongodb').ObjectID
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var userModel = require('../database/model/User_model');
var jwtUtils = require('../utils/jwt.utils');




// 
function infosAreValid(res) {
    return true
}

exports.addUser = function(req, res, db_collection) {
    var user = userModel.user_init();
    if (infosAreValid(res)) {
        bcrypt.hash(req.body.password, 5, function(err, bcryptedPassword) {
            user.email = req.body.email;
            user.first_name = req.body.first_name;
            user.last_name = req.body.last_name;
            user.birthday = req.body.birthday;
            user.gender = req.body.gender;
            user.pseudo = req.body.pseudo;
            user.password = bcryptedPassword;
            db_collection.insertOne(user)
        })

        .then(command => res.status(201).json(user))
    } else {
        res.status(400).json({ error: "Please, fill in the form proprely." })
    }
}

exports.connectUser = function(req, res, db_collection) {
    //Getting auth header 
    var headerAuth = req.headers['authorization'];
    var userId = jwtUtils.getUserId(headerAuth);

    //Test if already connected
    if (userId > 0) {
        return res.status(200).json({
            'state': 'connected, token valid'
        })
    }
    // Param 
    console.log(ObjectID);
    var email = req.body.email;
    var password = req.body.password;
    var model = userModel.user_model();
    console.log({ genre: email });
    var query = db_collection.findOne({ email: email }, function(err, user) {
        console.log(user);
        if (user) {
            console.log(password);
            console.log(user.password);
            bcrypt.compare(password, user.password, function(errBcrypt, resBcrypt) {

                if (resBcrypt) {
                    return (res.status(200).json({
                        'state': 'connected',
                        'token': jwtUtils.generateTokenForUser(user)
                    }))
                } else {
                    return (res.status(403).json({ error: 'failed to connect' }))
                }
            });
        } else { return res.status(401).json({ error: 'user unknown' }) };
    })



}

exports.findUser = function(req, res, db_collection) {
    var user = db_collection.findOne({ _id: ObjectID(req.params.id) })
        .then(user => (user) ? res.json(user) : res.status(404).json({ error: "User not found." }))
}

exports.deleteUser = function(req, res, db_collection) {
    db_collection.remove({ _id: ObjectID(req.params.id) })
        .then(command => (command.result.n == 1) ? res.json("User Successfully Deleted") : res.status(404).json({ error: "User not found." }))
}
//import
const ObjectID = require('mongodb').ObjectID
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var userModel = require('../database/model/User_model');
var jwtUtils = require('../utils/jwt.utils');
var findUser = require('../database/find/UserFind');
var del = require('../database/delete');




//
async function infosAreValid(req, db_collection) {
    var er = "";
    var email = req.body.email;
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var birthday = req.body.birthday;
    var gender = req.body.gender;
    var pseudo = req.body.pseudo;
    var password = req.body.password;
    const query1 = await findUser.getUserByEmail(email);
    const query2 = await findUser.getUserByPseudo(pseudo);


    if (email == "" || first_name == "" || last_name == "" || birthday == "" || gender == "" || pseudo == "" || password == "") {
        er += "Please, fill in the form proprely. \n"
    }
    if (query1 != null) {
        er += "Sorry, this email is already taken \n"

    }
    if (query2 != null) {
        er += "Sorry, this pseudo is already taken \n"

    }
    if (er != "") {
        return er
    } else return true
}



exports.addUser = async function(req, res, db_collection) {
    var user = userModel.user_init();
    var valid = await infosAreValid(req, db_collection);
    if (valid == true) {
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

        res.status(200).json({ state: 'Your account has been created', status: 200 });
    } else {
        res.status(400).json({ error: valid, status: 400 })
    }
}

exports.connectUser = function(req, res, db_collection) {
    // Param
    var email = req.body.email;
    var password = req.body.password;
    var model = userModel.user_model();
    var query = db_collection.findOne({ email: email }, function(err, user) {
        if (user) {
            bcrypt.compare(password, user.password, function(errBcrypt, resBcrypt) {

                if (resBcrypt) {
                    return (res.status(200).json({
                        'state': 'connected',
                        'token': jwtUtils.generateTokenForUser(user),
                        'status': 200
                    }))
                } else {
                    return (res.status(403).json({ error: 'failed to connect' }))
                }
            });
        } else { return res.status(401).json({ error: 'user unknown' }) };
    })



}

exports.isConnect = function(req, res) {
    //Getting auth header
    var headerAuth = req.headers.authorization;
    var userId = jwtUtils.getUserId(headerAuth);

    //Test if already connected
    if (userId != -1) {
        return res.status(200).json({
            'state': 'connected, token valid'
        })
    } else {
        return res.status(403).json({
            'error': 'token not valid'
        })
    }
}

exports.getMyProfile = async function(req, res) {
    //Getting auth header
    var headerAuth = req.headers.authorization;
    var userId = jwtUtils.getUserId(headerAuth);

    //Test if already connected
    if (userId != -1) {
        var user = await findUser.getUserByID(userId);
        if (user != null) {
            return res.status(200).json({
                'status': 200,
                'user': user
            })
        } else {
            return res.status(404).json({
                error: "User not found.",
                'status': 404
            })
        }
    } else {
        return res.status(403).json({
            'error': 'token not valid',
            'status': 403
        })
    }
}

exports.deleteMyProfile = async function(req, res) {
    //Getting auth header
    var headerAuth = req.headers.authorization;
    var userId = jwtUtils.getUserId(headerAuth);

    //Test if already connected
    if (userId != -1) {
        await del.deleteUserById(userId);
        return res.status(200).json({
            'status': 200,
            'state': 'user deleted'
        })

    } else {
        return res.status(403).json({
            'error': 'token not valid',
            'status': 403
        })
    }
}
exports.updateMyProfile = async function(req, res) {
    //Getting auth header
    var headerAuth = req.headers.authorization;
    var userId = jwtUtils.getUserId(headerAuth);

    //Test if already connected
    if (userId != -1) {
        var update = req.body.update;
        if (update != null) {
            var user = await findUser.getUserByID(userId);

            return res.status(200).json({
                'status': 200,
                'state': 'user deleted'
            })
        } else {
            return res.status(404).json({
                'status': 404,
                'error': 'nothing to update'
            })
        }

    } else {
        return res.status(403).json({
            'error': 'token not valid',
            'status': 403
        })
    }
}

async function existUser(email, db_collection) {

    if (user) {
        return 'true'
    } else return 'false';
}
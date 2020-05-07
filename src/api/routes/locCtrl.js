//import
const ObjectID = require('mongodb').ObjectID
const mongoose = require('mongoose');
var userModel = require('../database/model/User_model');
var jwtUtils = require('../utils/jwt.utils');
var findUser = require('../database/find/UserFind');
var up = require('../database/update/userUpdate');


// function

var db = mongoose.connection;
var collection = db.collection('UserCollection');

function endDurationDate(activation_date, duration) {
    var act_date = new Date(activation_date);
    var t = act_date.getTime();
    // On multiplie par 1000 pour une duration en seconde car le time est exprimé en millisecondes
    var endTime = t + duration * 1000
    return endTime
};


//exports

exports.getHistDate = async function (req, res) {
    //Getting auth header 
    var headerAuth = req.headers.authorization;
    var userId = jwtUtils.getUserId(headerAuth);

    if (userId != -1) {
        user = await findUser.getUserByID(userId);
        if (user != null) {
            return res.status(200).json({ dateList: user.hist_date, status: 200 })

        } else
            return res.status(404);


    } else {
        return res.status(403);

    }

};

exports.getHistLat = async function (req, res) {
    //Getting auth header 
    var headerAuth = req.headers.authorization;
    var userId = jwtUtils.getUserId(headerAuth);

    if (userId != -1) {
        user = await findUser.getUserByID(userId);
        if (user != null) {
            return res.status(200).json({ latList: user.hist_lat, status: 200 })

        } else
            return res.status(404);


    } else {
        return res.status(403);

    }

};

exports.getHistLong = async function (req, res) {
    //Getting auth header 
    var headerAuth = req.headers.authorization;
    var userId = jwtUtils.getUserId(headerAuth);

    if (userId != -1) {
        user = await findUser.getUserByID(userId);
        if (user != null) {
            return res.status(200).json({ longList: user.hist_long, status: 200 })

        } else
            return res.status(404);


    } else {
        return res.status(403);

    }

};

exports.addPosition = async function (req, res) {
    //Getting auth header 
    var headerAuth = req.headers.authorization;
    var userId = jwtUtils.getUserId(headerAuth);
    if (userId != -1) {
        user = await findUser.getUserByID(userId);
        if (user != null) {
            var activation_date = user.activation_date;
            var current_lat = user.current_lat;
            var current_long = user.current_long;
            var hist_date = user.hist_date;
            var hist_lat = user.hist_lat;
            var hist_long = user.hist_long;
            hist_date.forEach(element => {
                if (element == activation_date) {
                    return res.status(400).json({ error: activation_date + ' is already in your date history', status: 400 })
                }

            });

            var endTime = endDurationDate(activation_date, user.duration);
            var currentDate = new Date();
            var currentTime = currentDate.getTime();
            if (currenTime > endTime) {
                hist_lat.push(current_lat);
                hist_long.push(current_long);
                hist_date.push(activation_date);
                await up.updateUser(userId, { hist_lat: hist_lat });
                await up.updateUser(userId, { hist_long: hist_long });
                await up.updateUser(userId, { hist_date: hist_date });


                return res.status(200).json({ state: 'Position added', status: 200 });
            }
            else {
                return res.status(200).json({ state: 'Duration too short', status: 200 });
            }

        } else
            return res.status(403);


    } else {
        return res.status(403);

    }
}

exports.deletePosition = async function (req, res) {
    //Getting auth header 
    var headerAuth = req.headers.authorization;
    var userId = jwtUtils.getUserId(headerAuth);
    var date = req.body.date;
    console.log('date a supprimer' + date);
    if (userId != -1) {
        user = await findUser.getUserByID(userId);
        if (user != null) {
            var i = 0;
            var j = -1;
            var hist_date = user.hist_date;
            var hist_lat = user.hist_lat;
            var hist_long = user.hist_long;

            hist_date.forEach(element => {
                if (element == date) {
                    j=i;
                }
                i++;
            });

            if (j >= 0) {
                hist_lat.splice(j, 1);
                hist_long.splice(j, 1);
                hist_date.splice(j, 1);
                await up.updateUser(userId, { hist_lat: hist_lat });
                await up.updateUser(userId, { hist_long: hist_long });
                await up.updateUser(userId, { hist_date: hist_date });


                return res.status(200).json({ state: 'Position deleted', status: 200 });
            }
            else {
                return res.status(200).json({ state: 'No element to delete', status: 200 });
            }

        } else
            return res.status(403);


    } else {
        return res.status(403);

    }
}
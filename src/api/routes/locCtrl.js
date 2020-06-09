//import
const ObjectID = require('mongodb').ObjectID
const mongoose = require('mongoose');
var userModel = require('../database/model/User_model');
var jwtUtils = require('../utils/jwt.utils');
var findUser = require('../database/find/UserFind');
var up = require('../database/update/userUpdate');
var upPos = require('../database/update/updatePosition');
var positionModel = require('../database/model/Position_model');
var findPosition = require('../database/find/PositionFind');
var del = require('../database/delete');


// function

var db = mongoose.connection;
var positionCollection = db.collection('PositionCollection');

function endDurationDate(activation_date, duration) {
    var act_date = new Date(activation_date);
    var t = act_date.getTime();
    // On multiplie par 1000 pour une duration en seconde car le time est exprimé en millisecondes
    var endTime = t + duration * 1000
    return endTime
};


//exports

exports.getHistPosition = async function(req, res) {
    //Getting auth header 
    var headerAuth = req.headers.authorization;
    var userId = jwtUtils.getUserId(headerAuth);

    if (userId != -1) {
        user = await findUser.getUserByID(userId);
        if (user != null) {
            return res.status(200).json({ hist_positions: user.hist_positions, status: 200 })

        } else
            return res.status(200).json({ hist_positions: user.hist_positions, status: 200 })


    } else {
        return res.status(403);

    }

};

exports.getMyCurrentPosition = async function(req, res) {
    //Getting auth header 
    var headerAuth = req.headers.authorization;
    var userId = jwtUtils.getUserId(headerAuth);
    if (userId != -1) {
        const user = await findUser.getUserByID(userId);
        const position = await findPosition.findPositionByEmail(user.email);
        if (user != null) {
            if (position != null) {
                return res.status(200).json({ position: position, status: 200 });
            } else {
                return res.status(201).json({ status: 201, state: 'you don\'t post current position' });
            }
        } else
            return res.status(404).json({ status: 404 });


    } else {
        return res.status(403).json({ status: 403 });

    }

};

exports.getCurrentPosition = async function(req, res) {
    //Getting auth header 
    var headerAuth = req.headers.authorization;
    var userId = jwtUtils.getUserId(headerAuth);
    var email = req.body.email;
    if (userId != -1) {
        const position = await findPosition.findPositionByEmail(email);
        console.log(position);

        if (position != null) {
            return res.status(200).json({ position: position, status: 200 });
        } else {
            return (res.status(201).json({ status: 201 }));
        }



    } else {
        return res.status(403).json({ status: 403 });

    }

};



exports.addPosition = async function(req, res) {
    //Getting auth header 
    var headerAuth = req.headers.authorization;
    var userId = jwtUtils.getUserId(headerAuth);
    if (userId != -1) {
        user = await findUser.getUserByID(userId);

        if (user != null) {
            position = await findPosition.findPositionByEmail(user.email);
            var current_lat = req.body.lat;
            var current_long = req.body.long;
            var duration = req.body.duration;
            var message = req.body.message;
            var hist_positions = user.hist_positions;
            var currentDate = new Date();
            if (position != null) {
                var oldPosition = { hist_lat: position.lat, hist_long: position.long, hist_date: position.date, message: position.message, duration: position.duration };
                if (oldPosition.duration != null){
                    var endTime = endDurationDate(oldPosition.hist_date, oldPosition.duration);
                    var currentDate = new Date();
                    var currentTime = currentDate.getTime();
                    if (currentTime > endTime) {
                        hist_positions.push(oldPosition);
                        console.log(position._id);
                        await upPos.updatePosition(position._id, { long: current_long, lat: current_lat, date: currentDate, duration: duration, message: message });

                        return res.status(200).json({ state: 'Position added', status: 200 });
                    }       
                    else {
                        return res.status(401).json({ state: 'Duration too short', status: 401 });
                    }

                }
                else{
                    hist_positions.push(oldPosition);
                    console.log(position._id);
                    await upPos.updatePosition(position._id, { long: current_long, lat: current_lat, date: currentDate, duration: duration, message: message });
                }
            } else {
                position = positionModel.positionInit();
                position.email = user.email;
                position.long = current_long;
                position.lat = current_lat;
                position.date = currentDate;
                position.duration = duration;
                position.message = message;
                positionCollection.insertOne(position);

            }


            return res.status(200).json({ state: 'Position added', status: 200 });

        } else
            return res.status(403);


    } else {
        return res.status(403);

    }
}

exports.deletePosition = async function(req, res) {
    //Getting auth header 
    var headerAuth = req.headers.authorization;
    var userId = jwtUtils.getUserId(headerAuth);
    var date = new Date(req.body.date);
    var current = req.body.current;
    var haveToUpdate = false;
    console.log(date)
    if (userId != -1) {
        user = await findUser.getUserByID(userId);
        if (user != null) {
            if (current) {
                await del.deletePositionByEmail(user.email);
                return res.status(200).json({ state: 'element deleted', status: 200 });

            } else {
                var hist_positions = user.hist_positions;

                hist_positions.forEach(function(element, index) {
                    if (new Date(element.hist_date).getTime() === date.getTime()) {
                        hist_positions.splice(index, 1);
                        haveToUpdate = true;



                    }
                });
                if (haveToUpdate) {
                    await up.updateUser(userId, { hist_positions: hist_positions });
                    return res.status(200).json({ state: 'element deleted', status: 200 });
                }

                return res.status(200).json({ state: 'No element to delete', status: 200 });
            }
        } else {
            return res.status(403);
        }


    } else {
        return res.status(403);

    }
}

exports.getFriendsCurrentPosition = async function(req, res) {
    //Getting auth header 
    var headerAuth = req.headers.authorization;
    var userId = jwtUtils.getUserId(headerAuth);

    if (userId != -1) {
        var user = await findUser.getUserByID(userId);
        var friends = user.friends;
        var friendlist = [];
        friends.forEach(element => {
            friendlist.push(element.email)

        });
        if (friendlist != null) {
            const friendsCurrentPosition = await findPosition.findFriendsPosition(friendlist);
            console.log(friendsCurrentPosition);
            if (friendsCurrentPosition != null) {
                return res.status(200).json({ friendsPosition: friendsCurrentPosition, status: 200 });
            } else {
                return res.status(201).json({ state: "no friends position are available", status: 200 });
            }
        } else {
            return res.status(201).json({ state: "add friends to consult positions", status: 201 })
        }


    }

}
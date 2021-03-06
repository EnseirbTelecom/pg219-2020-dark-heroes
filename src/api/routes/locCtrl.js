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
    console.log(duration)
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
        var position = await findPosition.findPositionByEmail(user.email);
        var act_date= new Date();
        var time= act_date.getTime();
        if (position != null) {
    
            var expiration=endDurationDate(position.date,position.duration);
            if (time > expiration){
            var oldPosition = { hist_lat: position.lat, hist_long: position.long, hist_date: position.date, message: position.message, duration: position.duration };
            user.hist_positions.push(oldPosition);
            await up.updateUser(user._id,{hist_positions:user.hist_positions});
            await del.deletePositionByEmail(user.email);
            position=null;
                
            }
        }
            
        if (user != null) {
            if (position != null) {
                return res.status(200).json({ position: position,time:new Date(endDurationDate(position.date,parseInt(position.duration,10))), status: 200 });
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
            var duration = req.body.duration.split(':');
            duration=(parseInt(duration[0],10)*60+parseInt(duration[1],10))*60
        
            var message = req.body.message;
            var hist_positions = user.hist_positions;
            var currentDate = new Date();
            if(position!=null){
                
                var oldPosition = { hist_lat: position.lat, hist_long: position.long, hist_date: position.date, message: position.message, duration: position.duration };
    
                        hist_positions.push(oldPosition);

                        await upPos.updatePosition(position._id, { long: current_long, lat: current_lat, date: currentDate, duration: duration, message: message });
                        await up.updateUser(userId,{hist_positions : hist_positions});
                        return res.status(200).json({ state: 'Position added', status: 200 });

            }else {
                position = positionModel.positionInit();
                position.email = user.email;
                position.long = current_long;
                position.lat = current_lat;
                position.date = currentDate;
                position.duration = duration;
                position.message = message;
                if(findPosition.findPositionByDate(position.date)!=null){
                await positionCollection.insertOne(position);
                }

            }


            return res.status(200).json({ state: 'Position added', status: 200 });

        } else
            return res.status(403);
        } else
        return res.status(403);


}

exports.deletePosition = async function(req, res) {
    //Getting auth header 
    var headerAuth = req.headers.authorization;
    var userId = jwtUtils.getUserId(headerAuth);
    var date = new Date(req.body.date);
    var current = req.body.current;
    var haveToUpdate = false;
    if (userId != -1) {
        user = await findUser.getUserByID(userId);
        if (user != null) {
            if (current) {
                await del.deletePositionByEmail(user.email);
                return res.status(200).json({ state: 'element deleted', status: 200 });

            } else {
                var hist_positions = user.hist_positions;

                hist_positions.forEach(function(element, index) {
                    if ((new Date(element.hist_date).getTime() <= date.getTime()+1000)&&(new Date(element.hist_date).getTime() >= date.getTime()-1000)) {
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
            var act_date= new Date();
            var time= act_date.getTime();
            for (var i=0; i<friendsCurrentPosition.length;i++){
                var element=friendsCurrentPosition[i];
                var expiration=endDurationDate(element.date,element.duration);
                if (time > expiration){
                    const friend= await getUserByEmail(element.email);
                var oldPosition = { hist_lat: element.lat, hist_long: element.long, hist_date: element.date, message: element.message, duration: elemnt.duration };
                friend.hist_positions.pop(oldPosition);
                await up.updateUser(friend._id,{hist_positions:friend.hist_positions});
                await del.deletePositionByEmail(friend.email);
                friendsCurrentPosition.pop(i);
                    
                }
                i=i+1;
            };
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
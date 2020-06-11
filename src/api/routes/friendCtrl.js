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

//exports

exports.getFriends = async function(req, res) {
    //Getting auth header
    var headerAuth = req.headers.authorization;
    var userId = jwtUtils.getUserId(headerAuth);

    if (userId != -1) {
        user = await findUser.getUserByID(userId);
        if (user != null) {
            return res.status(200).json({ friendlist: user.friends, status: 200 })

        } else
            return res.status(404);


    } else {
        return res.status(403);

    }

};

exports.getFriendrequests = async function(req, res) {
    //Getting auth header
    var headerAuth = req.headers.authorization;
    var userId = jwtUtils.getUserId(headerAuth);

    if (userId != -1) {
        user = await findUser.getUserByID(userId);
        if (user != null) {
            return res.status(200).json({ friendrequests: user.friend_requests, status: 200 })

        } else
            return res.status(404);


    } else {
        return res.status(403);

    }

};

exports.addFriend = async function(req, res) {
    //Getting auth header
    var headerAuth = req.headers.authorization;
    var userId = jwtUtils.getUserId(headerAuth);
    var friend = req.body.friend;
    const Friend = await findUser.getUserByEmail(friend);
    if (Friend != null) {
        if (userId != -1) {
            user = await findUser.getUserByID(userId);
            if (user != null) {
                var email = user.email;
                if (email == friend){
                    return res.status(401).json({ error: friend + ' is you.', status: 401 })
                }
                var friends = user.friends;
                friends.forEach(element => {
                    if (element.email == friend) {
                        return res.status(400).json({ error: friend + ' is already your friend.', status: 400 })
                    }

                });
                var friend_pending = user.friend_pending;
                friend_pending.forEach(element => {
                    if (element.email == friend) {
                        return res.status(402).json({ error: friend + ' friend request already sent ', status: 402 })
                    }

                });
                var send_request = Friend.friend_requests;
                friend_pending.push({pseudo: Friend.pseudo, email: friend});
                send_request.push({pseudo: user.pseudo, email: user.email });
                await up.updateUser(userId, { friend_pending: friend_pending });
                await up.updateUser(Friend._id, { friend_requests: send_request });


                return res.status(200).json({ state: 'Friend request for ' + friend + ' sent.', status: 200 });

            } else
                return res.status(403);


        } else {
            return res.status(403);

        }
    } else {
        return res.status(404).json({ error: friend + ' does not exist.', status: 404 })
    }
}

exports.friendRequestReply = async function(req, res) {
    //Getting auth header
    var headerAuth = req.headers.authorization;
    var userId = jwtUtils.getUserId(headerAuth);
    var friend = req.body.friend;
    var accept = req.body.accept;
    const Friend = await findUser.getUserByEmail(friend);


    if (userId != -1) {
        user = await findUser.getUserByID(userId);
        if (user != null) {
            var userFriendRequests = user.friend_requests;
            var friendFriendPending = Friend.friend_pending;
            if (accept) {
                var userFriends = user.friends;
                var friendFriends = Friend.friends;
                userFriends.push({email: Friend.email,
                                  pseudo: Friend.pseudo,
                                  first_name: Friend.first_name,
                                  last_name:  Friend.last_name,
                                  birthday: Friend.birthday,
                                  gender: Friend.gender});
                friendFriends.push({email: user.email,
                                    pseudo: user.pseudo,
                                    first_name: user.first_name,
                                    last_name:  user.last_name,
                                    birthday: user.birthday,
                                    gender: user.gender});
                userFriendRequests.forEach(function(element, index) {
                    if (element.email == Friend.email)
                        userFriendRequests.splice(index, 1);
                });
                friendFriendPending.forEach(function(element, index) {
                    if (element.email == user.email)
                        friendFriendPending.splice(index, 1);
                });
                await up.updateUser(userId, { friends: userFriends, friend_requests: userFriendRequests });
                await up.updateUser(Friend._id, { friends: friendFriends, friend_pending: friendFriendPending });

                return res.status(200).json({ state: friend + ' has been added to your friends.', status: 200 })
            } else {
                userFriendRequests.forEach(function(element, index) {
                    if (element.email == Friend.email)
                        userFriendRequests.splice(index, 1);
                });
                friendFriendPending.forEach(function(element, index) {
                    if (element.email == user.email)
                        friendFriendPending.splice(index, 1);
                });
                await up.updateUser(userId, { friend_requests: userFriendRequests });
                await up.updateUser(Friend._id, { friend_pending: friendFriendPending });
                return res.status(200).json({ state: 'Friend request from ' + friend + ' rejected.', status: 200 });

            }

        } else
            return res.status(403);


    } else {
        return res.status(403);

    }
}

exports.deletefriend = async function(req, res) {
    //Getting auth header
    var headerAuth = req.headers.authorization;
    var userId = jwtUtils.getUserId(headerAuth);
    var friend = req.body.friend;
    const Friend = await findUser.getUserByEmail(friend);
    if (Friend != null) {
        if (userId != -1) {
            user = await findUser.getUserByID(userId);
            if (user != null) {
                var userfriends = user.friends;
                var friendfriends = Friend.friends;

                userfriends.forEach(function(element, index) {
                    if (element.email == Friend.email)
                        userfriends.splice(index, 1);
                });
                friendfriends.forEach(function(element, index) {
                    if (element.email == user.email)
                        friendfriends.splice(index, 1);
                });
                await up.updateUser(userId, { friends: userfriends });
                await up.updateUser(Friend._id, { friends: friendfriends });
                return res.status(200).json({ state: friend + ' has been removed.', status: 200 })
            } else
                return res.status(403);

        } else {
            return res.status(403);
        }
    } else {
        return res.status(404).json({ error: friend + ' does not exist.', status: 404 })
    }
}

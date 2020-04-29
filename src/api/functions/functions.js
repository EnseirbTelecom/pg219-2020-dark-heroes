const ObjectID = require('mongodb').ObjectID

function infosCheck(user){
	for (let attr in user) {
		if (user[attr] === undefined)
			return false
	}
  return true
}

exports.addUser = function(req,res,db_collection){
   const user = {
     email: req.body.email,
     password: req.body.password,
     first_name: req.body.first_name,
     last_name: req.body.last_name,
     birthday: req.body.birthday,
   }
   if (infosCheck(user)){
     db_collection.insertOne(user)
       .then(command => res.status(201).json(user))
   }
   else {
     res.status(400).json({ error: "Please, fill in the form proprely." })
   }
}

exports.findUser = function(req,res,db_collection){
  var user = db_collection.findOne({ _id: ObjectID(req.params.id) })
  .then(user => (user) ? res.json(user) : res.status(404).json({ error: "User not found." }))
  .catch(err => console.log("err" + err))
}

exports.deleteUser = function(req,res,db_collection){
  db_collection.remove({ _id: ObjectID(req.params.id) })
    .then(command => (command.result.n == 1) ? res.json("User Successfully Deleted") : res.status(404).json({ error: "User not found." }))
    .catch(err => console.log("err" + err))
}

//imports
var schem = require('../schema/Position_Schema');
var mongoose = require('mongoose');

//model
var positionSchema = schem.position_schema();
var model = mongoose.model('PositionCollection', positionSchema);


//exports

exports.positionModel = function() {
    return model;
};

exports.positionInit = function() {
    var position = new model();
    position.email = null;
    position.pseudo = null;
    position.lat = null;
    position.long = null;
    position.date = null;
    position.duration = null;
    position.message = null;

    return (position);
}
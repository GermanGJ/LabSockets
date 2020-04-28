const { Schema, model }  = require('mongoose');

const PartidaSchema = new Schema({
    nombre: String,
    jugadorCreador: String,
    socketId: String,
    partidaOK: Boolean
});

module.exports = model('Partida', PartidaSchema);


/*
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PartidaSchema = Schema({
    nombre: String,
    jugadorCreador: String,
    socketId: String,
    partidaOK: Boolean
});

module.exports = mongoose.model('Partida', PartidaSchema);
*/
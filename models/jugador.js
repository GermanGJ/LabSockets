const { Schema, model } = require('mongoose');

const JugadorSchema = new Schema({
    nombre: String,
    partida: {type: Schema.ObjectId, ref: 'Partida'}
});

module.exports = model('Jugador', JugadorSchema);
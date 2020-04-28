var Partida = require('../models/partida');
var Jugador = require('./jugador');

function savePartida(req){

    var partida = new Partida({
        nombre: req.Nombre,
        jugadorCreador: req.JugadorCreador,
        socketId: req.SocketId,
        partidaOK: req.PartidaOK
    });

    partida.save((err, document) => {
        if (err) console.log(err);
        console.log(document);
    });
}

async function crearPartida(req){
    try{
        console.log('BD: Inicio crearPartida.');
        var partida = new Partida({
            nombre: req.Nombre,
            jugadorCreador: req.JugadorCreador,
            socketId: req.SocketId,
            partidaOK: req.PartidaOK
        });
        console.log('BD: Se mapearon datos.');
        const partidaR = await partida.save();
        console.log('BD: Guardado en BD.');
        return partidaR;
    } catch(err){
        console.log('BD: Error en Cracion de Partida. (' + err.message + ").");
        return err;
    }
}

module.exports = {
    savePartida,
    crearPartida
};
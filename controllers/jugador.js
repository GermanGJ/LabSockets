const Jugador = require('../models/jugador');

function salvarJugador(req){

    var jugador = new Jugador({
        nombre: req.jugadorCreador,
        partida: req._id
    });

    jugador.save((err, rJugador) => {
        if (err){
            console.log('ErrorBD: Error en salvar jugador.');
        }else{
            console.log('BD: Se salvo jugador.');
            console.log(rJugador);
            console.log("BD: Id -> " + rJugador._id);
        }
    })
}

module.exports = {
    salvarJugador
};
console.log('Inicio Node.Js (LabSockets.IO)');

//Controles de Partidas y Jugadores.
const Jugadores = [];
const Partidas = [];

const path = require('path');
const SocketIO = require('socket.io'); 
//Inicializar express.
const express = require('express');
const app = express();

var mongoose = require('mongoose');
var PartidaController = require('./controllers/partida');


//SETTINGS EXPRESS
//Configurar puerto.
app.set('port', process.env.PORT || 3000);
//static files.
console.log(__dirname);
app.use(express.static(path.join(__dirname, 'public')));
//Incio servidor.
const server = app.listen(app.get('port'), () => {
    console.log('Servidor en puerto: ', app.get('port'));
});


//Conexion de base de datos.
const uri = 'mongodb://localhost:27017/RummiQDB';
var port = process.env.PORT || 3977;
mongoose.connect(uri, {
    useNewUrlParser: true, 
    useUnifiedTopology: true});

mongoose.connection.once('open', _ => {
    console.log('Base de Datos conectada ', uri);
});

mongoose.connection.on('error', err => {
    console.log(err);
});

//SETTINGS SOCKET.IO
console.log('Configurado SOCKET.IO');
const io = SocketIO(server);
//WEBSOCKET
io.on('connection', (socket) => {
    console.log('Nueva Conexion', socket.id);

    //Creacion de una partida.
    socket.on('RummiQ:CreaPartida', (data) => {
        console.log('CreaPartida (SId)', socket.id);
        console.log(data);

        //Crear partida en BD.
        const Jugador = {
            Nombre: data.Jugador,
            Partida: data.Partida
        };
        Jugadores.push(Jugador);

        const CreacionPartida = {
            SocketId: socket.id,
            Nombre: data.Partida,
            JugadorCreador: data.Jugador,
            PartidaOK: true,
            Jugador: Jugador
        };

        Partidas.push(CreacionPartida);
        console.log('Antes de Crear');
        PartidaController.crearPartida(CreacionPartida);
        console.log('Despues de Crear');

        //Agrgar a Room
        socket.join(data.Partida);
        console.log('Partida: ' + CreacionPartida);
        //Responder al cliente.
        //socket.emit('RummiQ:PartidaCreada', Partida);
        socket.join(CreacionPartida.Nombre).emit("RummiQ:PartidaCreada", CreacionPartida, socket.id);
    });

    //Unirse a una partida.
    socket.on('RummiQ:UnirmePartida', (data) => {
        console.log('UnionPartida (SId)', socket.id);
        console.log(data);

        //Registrarlo en base de datos.
        const Jugador = {
            Nombre: data.Jugador,
            Partida: data.Partida
        };
        Jugadores.push(Jugador);

        //Agrgar a Room
        socket.join(data.Partida);
        socket.join(data.Partida).emit("RummiQ:NuevoJugador", Jugadores, socket.id);
    });
});
console.log('Cargo Node.Js (LabSockets.IO)');
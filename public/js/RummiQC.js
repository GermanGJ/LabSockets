console.log('inicio RummiQC.js');

let btnCrearPartida = document.getElementById('btnCrearPartida');
let Jugador = document.getElementById('NomJugadorCreador');
let Partida = document.getElementById('NomPartida');
let tblJugadores = document.getElementById('ListaJugadores');

const socket = io();

//Creacion de Nueva Partida.
btnCrearPartida.addEventListener('click', function () {
    console.log('Crear Partida: ' + io.socket);
    socket.emit('RummiQ:CreaPartida', {
        Jugador: NomJugadorCreador.value,
        Partida: Partida.value
    });
});

socket.on('RummiQ:PartidaCreada', function (data) {
    console.log('Partida Creada: ' + data) 
    //Validar si fue creada.
    tblJugadores.innerHTML = `<table class="TablaListaJugadores"><tr class="TablaListaJugadores-Cabecera"><td>Jugadores - (${data.Nombre})</td></tr><tr><td>${data.JugadorCreador}</td></tr></table>`;
});

//Unirse a una Partida.
let btnUnirmePartida = document.getElementById('btnUnirmePartida');
let JugadorU = document.getElementById('NomJugador');
let PartidaU = document.getElementById('Partida')

btnUnirmePartida.addEventListener('click', function () {
    console.log('Unirme a Partida: ' + io.socket);
    socket.emit('RummiQ:UnirmePartida', {
        Jugador: JugadorU.value,
        Partida: PartidaU.value
    });
});

socket.on('RummiQ:NuevoJugador', function (data) {
    console.log('Ingreso a Partida: ' + data)
    
    var atmp = `<table class="TablaListaJugadores"><tr class="TablaListaJugadores-Cabecera"><td>Jugadores</td></tr>`;
    for (i in data) 
    {
        console.log(data[i].Nombre);
        atmp += `<tr><td>${data[i].Nombre}</td></tr>`;
    }
    atmp += `</table>`;

    //Validar si fue creada.
    //tblJugadores.innerHTML = `<table class="TablaListaJugadores"><tr class="TablaListaJugadores-Cabecera"><td>Jugadores - (${data.Nombre})</td></tr><tr><td>${data.JugadorCreador}</td></tr></table>`;
    tblJugadores.innerHTML = atmp;
});

console.log('Cargado RummiQC.js');
/**
 * Created by edx on 02-26-16.
 */
var request = require('request');
var server = require('express.io')();
var express = require('express.io');
var moment = require('moment');

server.http().io();

var hosts = {};
hosts['127.0.0.1'] = moment();
// Returns the index of the value if it exists, or undefined if not
Object.defineProperty(Object.prototype, "associativeIndexOf", {
    value: function(value) {
        for (var key in this)
            //if (this[key] == value) return key;
            if (key == value) return this[key];
        return -1;
    }
});

function callback(error, response, body) {
    //console.log(body)
}


setInterval(function(){
    //recorres el listado de ips
    for (var key in hosts) {
        //calcular los segundos transcurridos desde la ultima conexion
        ms = moment().diff(hosts[key].time)
        seg = moment.duration(ms).seconds()
        if (seg > 6 ) {
            server.io.broadcast("on_ausence", {ip:key, id:hosts[key].id})
            console.log("Conexion perdida con " +  hosts[key].id)
            url = 'http://127.0.0.1:8000/api/network/nodes/' +hosts[key].id+ '/'
            request({ url: url, method: 'PUT', json: {connected: false, ip: key }}, callback)
            delete hosts[key]
            //publicar evento
        }
    }
}, 2000)

//agregar post, cookie y sesiones
server.configure(function () {
    server.use(express.bodyParser());
    server.use(express.methodOverride());
});

server.get('/', function (req, res) {
    //console.info(req.body)
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    var index = hosts.associativeIndexOf('127.0.0.2');
    //Si se recive -1 notificar nueva conexion
    if(index < 0)
        console.log("Nuevo Conectado:")
    hosts['127.0.0.2'] = moment()
    res.send("<h1>WELCOME</h1>");
});


server.post('/presence', function (req, res) {

    var index = hosts.associativeIndexOf(req.body.ip);
    //Si se recive -1 notificar nueva conexion
    if(index < 0) {
        console.log("Nuevo Conectado:" + req.body.ip)
        url = 'http://127.0.0.1:8000/api/network/nodes/' + req.body.id + '/'
        request({ url: url, method: 'PUT', json: {connected: true, ip: req.body.ip }}, callback)
        server.io.broadcast("on_presence", req.body)
    }
    hosts[req.body.ip] ={'time': moment(), 'id':req.body.id}
    res.send("PRESENCE_ACK");
});

server.post('/file_change', function (req, res) {
    console.log(req.body)
    res.send("FILE_CHANGE_ACK");
});


server.post('/', function (req, res) {
    //console.info(req.body)
    server.io.broadcast("on_rsrc_update", req.body)
    res.send("ACK");
});

server.post('/shutdown', function (req, res) {
    console.info('shutdown')
    console.info(req.body)
    res.send("SHUTDOWN_ACK");
});

server.post('/startup', function (req, res) {
    console.info('start')
    console.info(req.body)
    res.send("STARTUP_ACK");
});


server.post('/linkup', function (req, res) {
    console.info(req.body)
    res.send("INTERFACE_UP_ACK");
});

server.post('/linkdown', function (req, res) {
    console.info(req.body)
    res.send("INTERFACE_DOWN_ACK");
});


server.listen(8810);
console.log("el servidor esta corriendo http://localhost:8810");
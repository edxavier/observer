/**
 * Created by edx on 03-02-16.
 */
var app = angular.module('observer', ['ui.knob']);
app.config(function($interpolateProvider, $httpProvider){
    $interpolateProvider.startSymbol('[[')
        .endSymbol(']]');
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
});



//io = io.connect('http://192.168.137.22:8810');
io = io.connect('http://192.168.137.201:8810');
io.on('connect', function(){
             console.log('Connected to server');
});

io.on('on_presence', function(data){
    $.snackbar({content: "<i class='circular inverted green wifi icon'></i> " + data.ip +
            " se ha conectado", htmlAllowed: true, timeout: 8000});
    var audio = new Audio('/static/snd/noty2.mp3');
    audio.play();
});


io.on('on_ausence', function(data){
    var audio = new Audio('/static/snd/noty1.mp3');
    audio.play();
    $.snackbar({content: "<i class='circular inverted red wifi icon'></i> " + data.ip +
            " se ha desconectado", htmlAllowed: true, timeout: 8000});
});


io.on('on_shutdown', function(data){
    var audio = new Audio('/static/snd/shutdown.wav');
    audio.play();
    $.snackbar({content: "<i class='circular inverted red power icon'></i> "+data.description, htmlAllowed: true, timeout: 8000});
});


io.on('on_startup', function(data){
    var audio = new Audio('/static/snd/startup.mp3');
    audio.play();
    $.snackbar({content: "<i class='circular inverted  green power icon'></i> "+data.description, htmlAllowed: true, timeout: 8000});
});


io.on('on_file_change', function(data){
    var audio = new Audio('/static/snd/pop.mp3');
    audio.play();
    $.snackbar({content: "<i class='circular inverted green file icon'></i> "+data.file+" se ha modificado en " + data.node, htmlAllowed: true, timeout: 8000});
});
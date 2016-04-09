/**
 * Created by edx on 03-02-16.
 */
var app = angular.module('observer', []);
app.config(function($interpolateProvider, $httpProvider){
    $interpolateProvider.startSymbol('[[')
        .endSymbol(']]');
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
});
io = io.connect('http://192.168.137.22:8810');
io.on('connect', function(){
             console.log('Connected to server');
         });
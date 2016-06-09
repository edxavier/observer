/**
 * Created by edx on 26/04/16.
 */


app.factory('notifyFactory', function ($http) {
    var notifications = {};

    //#############################INIT DATA###############################################
    //cargar todas las notas
    notifications.loadNotifications = $http.get('/api/network/notification/?id=&viewed=3').success(function(data){
       notifications.notifications = data;
    });

    notifications.getNotifications = function (callback) {
        notifications.loadNotifications.then(function () {
            callback(notifications.notifications)
        })
    }
    return notifications;
})


app.controller('notifyCtrl', function($scope,  $rootScope, $http, notifyFactory){

    $scope.notifications = [];

    notifyFactory.getNotifications(function (data) {
        $scope.notifications = data;
        //calcular la carga de la cpu
        for(var i = 0; i< data.length; i++){
            $scope.notifications[i].time_ago = moment(data[i].created).fromNow(true);
        }
    })

//al recibir notificacion de archivo agrewgarlo al menu de notificaciones
    io.on('on_file_change', function(data){
          fdata = {
            "id": 0,
            "pos": "",
            "hostname": data.node,
            "ip": data.ip,
            "description": "El archivo "+data.file+" fue modificado el "+ data.hora,
            "viewed": false,
            "created": data.hora,
              "time_ago": moment(data.hora).fromNow(true)
          }
        $scope.notifications.unshift(fdata)

    });


    $scope.mark_as_read = function (obj) {

        $(".modal-body").html(obj.description)
        $(".modal-title").html(obj.hostname+ " ("+obj.ip+")")
        $('#myModal').modal()
        $('#myModal').on('hidden.bs.modal', function (e) {
            // do something...
            if(obj.id>0 && !obj.viewed){
                $http.put('/api/network/notification/'+ obj.id +'/', {'viewed': true}).success(function (data) {
                    for(var i = 0; i<$scope.notifications.length;i++)
                    {
                        if(obj.id===$scope.notifications[i].id){
                            $scope.notifications.splice(i,1);
                        }
                    }
                }).error(function (data) {
                    alert("No fue posible actualizar el estado de la notificacion")
                })
            }
        })

    }
});

/**
 * Created by edx on 03-02-16.
 */

app.factory('nodeFactory', function ($http) {
    var nodes = {};

    //#############################INIT DATA###############################################
    //cargar todas las notas
    nodes.loadNodes = $http.get('/api/network/nodes/').success(function(data){
       nodes.nodes = data;
    });
    nodes.getNodes = function (callback) {
        nodes.loadNodes.then(function () {
            callback(nodes.nodes)
        })
    }
    return nodes;
})


app.controller('nodesCtrl', function($scope,  $rootScope, $http, nodeFactory){
    $scope.nodes = []
    //Representacion de meses en segundos
    $scope.one_month = 2592000;
    $scope.two_month = 5184000;
    $scope.three_month = 7776000;

    $scope.value = 256;
    
    $scope.options = {
        dynamicOptions:true,
      readOnly:true,
      size: 60,
      startAngle: 270,
      endAngle: 450,
        skin: {
        type: 'tron',
        width: 3,
        color: '#656D7F',
        spaceWidth: 2
      },
      barColor: '#3F51B5',
      trackWidth: 15,
      barWidth: 15,
      textColor: '#494B52',
      max: 100
    };

    nodeFactory.getNodes(function (data) {
        $scope.nodes = data;
        //calcular la carga de la cpu
        for(var i = 0; i< data.length; i++){
            $scope.nodes[i].load_prc5 = $scope.nodes[i].load5 * 100 / $scope.nodes[i].cores
            $scope.nodes[i].load_prc15 = $scope.nodes[i].load15 * 100 / $scope.nodes[i].cores
            $scope.nodes[i].load_prc5 = ($scope.nodes[i].load_prc5).toFixed(1)
            $scope.nodes[i].load_prc15 = ($scope.nodes[i].load_prc15).toFixed(1)
            $scope.nodes[i].cpu_pcpu = ($scope.nodes[i].cpu_pcpu).toFixed(1)
            $scope.nodes[i].ram_prc = ($scope.nodes[i].ram_prc).toFixed(1)

            $scope.nodes[i].roptions =  $scope.options;
            $scope.nodes[i].loptions =  $scope.options;
            $scope.nodes[i].coptions =  $scope.options;

        }
    })

    try{
        io.on('on_presence', function(data){
            /* $.snackbar({content: "<i class='circular inverted green wifi icon'></i> " + data.ip +
            " se ha conectado", htmlAllowed: true, timeout: 8000});
            var audio = new Audio('/static/snd/noty2.mp3');
            audio.play();*/

            obj = $scope.getObj(data.id)
            $rootScope.$apply(function() {
                obj.connected = true
            });
        });
        io.on('on_ausence', function(data){
            /*
            var audio = new Audio('/static/snd/noty1.mp3');
            audio.play();
            $.snackbar({content: "<i class='circular inverted red wifi icon'></i> " + data.ip +
            " se ha desconectado", htmlAllowed: true, timeout: 8000});*/
            obj = $scope.getObj(data.id)
            $rootScope.$apply(function() {
                obj.connected = false
            });
        });

        io.on('on_rsrc_update', function(data){
            //console.log(data.uptime_str);
            obj = $scope.getObj(data.id)
            $rootScope.$apply(function() {
                obj.uptime_str = data.uptime_str
                obj.procs = data.procs
                obj.ram_prc = parseFloat(data.ram_prc).toFixed(1)
                obj.cpu_pcpu = parseFloat(data.cpu_pcpu).toFixed(1)
                obj.load5 = data.load5
                obj.load15 = data.load15
                obj.cpu_proc_name = data.cpu_proc_name
                obj.cpu_proc_pcpu = data.cpu_proc_pcpu
                obj.ram_top_proc = data.ram_top_proc
                obj.ram_top_pmem = data.ram_top_pmem
                obj.sync_dif = data.sync_dif
                obj.load_prc5 = (obj.load5 * 100 / obj.cores).toFixed(1)
                obj.load_prc15 = (obj.load15 * 100 / obj.cores).toFixed(1)

                if(obj.ram_prc<30){
                 obj.roptions.barColor='#4CAF50';
                }else if(obj.ram_prc>=30 && obj.ram_prc<60){
                    obj.roptions.barColor='#2196F3';
                }
                else if(obj.ram_prc>=60 && obj.ram_prc<90){
                    obj.roptions.barColor='#FFC107';
                }
                else if(obj.ram_prc>=90){
                    obj.roptions.barColor='#f44336';
                }

                     if(obj.load_prc5<30){
                 obj.loptions.barColor='#4CAF50';
                }else if(obj.ram_prc>=30 && obj.ram_prc<60){
                    obj.loptions.barColor='#2196F3';
                }
                else if(obj.load_prc5>=60 && obj.load_prc5<90){
                    obj.loptions.barColor='#FFC107';
                }
                else if(obj.load_prc5>=90){
                    obj.loptions.barColor='#f44336';
                }

                     if(obj.cpu_pcpu<30){
                 obj.coptions.barColor='#4CAF50';
                }else if(obj.cpu_pcpu>=30 && obj.cpu_pcpu<60){
                    obj.coptions.barColor='#2196F3';
                }
                else if(obj.cpu_pcpu>=60 && obj.cpu_pcpu<90){
                    obj.coptions.barColor='#FFC107';
                }
                else if(obj.cpu_pcpu>=90){
                    obj.coptions.barColor='#f44336';
                }

            });

        });
    }catch(err) {
        console.log(err)
    }

    // Funcion para obtener un objeto basado en su id
     $scope.getObj = function(id){
        for(var i = 0; i < $scope.nodes.length;i++){
                if($scope.nodes[i].id === parseInt(id)) {
                    return $scope.nodes[i]
                    break
                }
        }
    }

});
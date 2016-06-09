
function load_hist(host) {
console.log(host)
var daysback = moment().subtract(10, 'days')

    $.getJSON('/api/network/performance_hist/?node='+host+'&min_date='+daysback.format("DD/MM/YYYY"), function (data) {

        //Inicializar array con datos a vizualizar
        ram_h = []
        cpu_h = []
        load5_h = []
        load15_h = []
        disk_h = []
        procs_h = []

        var day = moment(data[0].humanise_date);

        init_date = Date.UTC(day.year(), day.month(), day.date(), day.hours(), day.minutes(), day.seconds());

        for (var i = 0; i < data.length; i++) {
            var day2 = moment(data[i].humanise_date);
            cur_date = Date.UTC(day2.year(), day2.month(), day2.date(), day2.hours(), day2.minutes(), day.seconds());

            rprc = parseFloat(data[i].ram_prc).toFixed(1)
            cprc = parseFloat(data[i].cpu_pcpu).toFixed(1)
            dprc = parseFloat(data[i].part_usage).toFixed(1)
            l5prc = parseFloat(data[i].load5 * 100 / data[i].cores).toFixed(1)
            l15prc = parseFloat(data[i].load15 * 100 / data[i].cores).toFixed(1)

            ram_h.push([cur_date, parseFloat(rprc)]);
            procs_h.push([cur_date, parseFloat(data[i].procs)]);
            disk_h.push([cur_date, parseFloat(dprc)]);
            cpu_h.push([cur_date, parseFloat(cprc)]);
            load5_h.push([cur_date, parseFloat(l5prc)]);
            load15_h.push([cur_date, parseFloat(l15prc)]);
        }
//console.log(ram_h)

        $('#container').highcharts({
            chart: {
                zoomType: 'x'
            },
            title: {
                text: 'Historial de uso de Memoria RAM en los ultimos 10 dias'
            },
            subtitle: {
                text: document.ontouchstart === undefined ?
                    'Haga clic y arrastre en el área de trazado para hacer zoom' : 'Pinch the chart to zoom in'
            },
            xAxis: {
                type: 'datetime',
            },
            yAxis: {
                title: {
                    text: '% de uso'
                }
            },
            tooltip: {
                xDateFormat: '%A, %d %B %Y, %H:%M:%S',
                shared: true,
                valueSuffix: ' %'
            },
            legend: {
                enabled: true
            },
            plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    },
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },
            series: [{
                type: 'spline',
                name: 'ram',
                pointInterval: 60 * 1000,
                //pointStart: Date.UTC(2006, 0, 1),
                pointStart: day,
                data: ram_h,
                zones: [{
                    value: 30,
                    color: '#4caf50'
                }, {
                    value: 60,
                    color: '#03A9F4'
                },
                    {
                        value: 90,
                        color: '#FFC107'
                    }, {
                        color: '#C51162'
                    },
                ],

            }]
        });


        $('#line-load').highcharts({
            chart: {
                zoomType: 'x'
            },
            title: {
                text: 'Historial de carga promedio de CPU en los ultimos 10 dias'
            },
            subtitle: {
                text: document.ontouchstart === undefined ?
                    'Haga clic y arrastre en el área de trazado para hacer zoom' : 'Pinch the chart to zoom in'
            },
            xAxis: {
                type: 'datetime',
            },
            yAxis: {
                title: {
                    text: '% de carga'
                }
            },
            tooltip: {
                xDateFormat: '%A, %d %B %Y, %H:%M:%S',
                shared: true,
                valueSuffix: ' %'
            },
            legend: {
                enabled: true
            },
            plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    },
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },
            series: [{
                type: 'spline',
                name: 'load5',
                pointInterval: 60 * 1000,
                //pointStart: Date.UTC(2006, 0, 1),
                pointStart: day,
                data:load5_h,
                color: "#FF9800"
            },
            {
                type: 'spline',
                name: 'load15',
                pointInterval: 60 * 1000,
                //pointStart: Date.UTC(2006, 0, 1),
                pointStart: day,
                data:load15_h,
                color: "#9C27B0"
            }
            ]
        });


        $('#line-cpu').highcharts({
            chart: {
                zoomType: 'x'
            },
            title: {
                text: 'Historial de uso de CPU en los ultimos 10 dias'
            },
            subtitle: {
                text: document.ontouchstart === undefined ?
                    'Haga clic y arrastre en el área de trazado para hacer zoom' : 'Pinch the chart to zoom in'
            },
            xAxis: {
                type: 'datetime',
            },
            yAxis: {
                title: {
                    text: '% de uso'
                }
            },
            tooltip: {
                xDateFormat: '%A, %d %B %Y, %H:%M:%S',
                shared: true,
                valueSuffix: ' %'
            },
            legend: {
                enabled: true
            },
            plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    },
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },
            series: [{
                type: 'spline',
                name: 'cpu',
                pointInterval: 60 * 1000,
                //pointStart: Date.UTC(2006, 0, 1),
                pointStart: day,
                data: cpu_h,
                zones: [{
                    value: 30,
                    color: '#4caf50'
                }, {
                    value: 60,
                    color: '#03A9F4'
                },
                    {
                        value: 90,
                        color: '#FFC107'
                    }, {
                        color: '#C51162'
                    },
                ]
            }]
        });

     $('#line-disk').highcharts({
            chart: {
                zoomType: 'x'
            },
            title: {
                text: 'Historial de uso de pparticion '+ data[0].partition +' en los ultimos 10 dias'
            },
            subtitle: {
                text: document.ontouchstart === undefined ?
                    'Haga clic y arrastre en el área de trazado para hacer zoom' : 'Pinch the chart to zoom in'
            },
            xAxis: {
                type: 'datetime',
            },
            yAxis: {
                title: {
                    text: '% de uso'
                }
            },
            tooltip: {
                xDateFormat: '%A, %d %B %Y, %H:%M:%S',
                shared: true,
                valueSuffix: ' %'
            },
            legend: {
                enabled: true
            },
            plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    },
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },
            series: [{
                type: 'spline',
                name: 'Uso de particion '+data[0].partition,
                pointInterval: 60 * 1000,
                //pointStart: Date.UTC(2006, 0, 1),
                pointStart: day,
                data: disk_h,
            }]
        });



     $('#line-procs').highcharts({
            chart: {
                zoomType: 'x'
            },
            title: {
                text: 'Historial de numero de procesos en ejecucion  en los ultimos 10 dias'
            },
            subtitle: {
                text: document.ontouchstart === undefined ?
                    'Haga clic y arrastre en el área de trazado para hacer zoom' : 'Pinch the chart to zoom in'
            },
            xAxis: {
                type: 'datetime',
            },
            yAxis: {
                title: {
                    text: 'Numero de procesos'
                }
            },
            tooltip: {
                xDateFormat: '%A, %d %B %Y, %H:%M:%S',
                shared: true,
                valueSuffix: ''
            },
            legend: {
                enabled: true
            },
            plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    },
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },
            series: [{
                type: 'spline',
                name: 'Numero de procesos',
                pointInterval: 60 * 1000,
                //pointStart: Date.UTC(2006, 0, 1),
                pointStart: day,
                data: procs_h,
            }]
        });



    });

}
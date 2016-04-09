
function load_hist(host) {
console.log(host)

    $.getJSON('/api/network/performance_hist/?node='+host+'&min_date=01/04/2016&max_date=03/04/2016', function (data) {


        //Inicializar array con datos a vizualizar
        ram_h = []
        var day = moment(data[0].created);

        init_date = Date.UTC(day.year(), day.month(), day.date(), day.hours(), day.minutes());

        for (var i = 0; i < data.length; i++) {
            var day2 = moment(data[i].created);
            cur_date = Date.UTC(day2.year(), day2.month(), day2.date(), day2.hours(), day2.minutes());
            prc = parseFloat(data[i].ram_prc).toFixed(1)

            ram_h.push([cur_date, parseFloat(prc)]);
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
                type: 'datetime'
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
                type: 'area',
                name: 'ram',
                pointInterval: 60 * 1000,
                //pointStart: Date.UTC(2006, 0, 1),
                pointStart: init_date,
                data: ram_h,
                zones: [{
                    value: 30,
                    color: '#03A9F4'
                }, {
                    value: 60,
                    color: '#4CAF50'
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
    });

}
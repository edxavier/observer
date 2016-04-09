/**
 * Created by edx on 03-05-16.
 */
var ram_chart = null;
var cpu_chart = null;
var load_chart = null;

var ram_gaugeOptions = {
	        chart: {
	            type: 'solidgauge',
                events: {
                        load: function () {
                            ram_chart = this;
                        }
                    }
	        }
};

var cpu_gaugeOptions = {
	        chart: {
	            type: 'solidgauge',
                events: {
                        load: function () {
                            cpu_chart = this;
                        }
                    }
	        }
};

var load_gaugeOptions = {
	        chart: {
	            type: 'solidgauge',
                events: {
                        load: function () {
                            load_chart = this;
                        }
                    }
	        }
};


var opt2 = {

	        title: null,
	        pane: {
	            center: ['50%', '85%'],
	            size: '140%',
	            startAngle: -90,
	            endAngle: 90,
	            background: {
	                backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
	                innerRadius: '60%',
	                outerRadius: '100%',
	                shape: 'arc'
	            }
	        },
	        tooltip: {
	            enabled: false
	        },
	        // the value axis
	        yAxis: {
	            stops: [
	                [0.1, '#55BF3B'], // green
	                [0.5, '#DDDF0D'], // yellow
	                [0.9, '#DF5353'] // red
	            ],
	            lineWidth: 0,
	            minorTickInterval: null,
	            tickPixelInterval: 400,
	            tickWidth: 0,
	            title: {
	                y: -70
	            },
	            labels: {
	                y: 16
	            }
	        },
	        plotOptions: {
	            solidgauge: {
	                dataLabels: {
	                    y: 5,
	                    borderWidth: 0,
	                    useHTML: true
	                }
	            }
	        }
}



var ram_copt = {
        yAxis: {
            min: 0,
            max: 100,
            title: {
                text: 'Uso RAM'
            }
        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'RAM',
            data: [0],
            dataLabels: {
                format: '<div style="text-align:center"><span style="font-size:15px;color:' +
                ((Highcharts.theme && Highcharts.theme.contrastTextColor) || '#616161') + '">{y}%</span><br/>' +
                '<span style="font-size:12px;color:silver">de uso</span></div>'
            },
            tooltip: {
                valueSuffix: '%'
            }
        }]

    }

    var load_copt = {
        yAxis: {
            min: 0,
            max: 100,
            title: {
                text: 'Carga CPU'
            }
        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'CPU Load',
            data: [0],
            dataLabels: {
                format: '<div style="text-align:center"><span style="font-size:15px;color:' +
                ((Highcharts.theme && Highcharts.theme.contrastTextColor) || '#616161') + '">{y}%</span><br/>' +
                '<span style="font-size:12px;color:silver">de carga</span></div>'
            },
            tooltip: {
                valueSuffix: '%'
            }
        }]

    }

    var cpu_copt = {
        yAxis: {
            min: 0,
            max: 100,
            title: {
                text: 'Uso CPU'
            }
        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'CPU',
            data: [0],
            dataLabels: {
                format: '<div style="text-align:center"><span style="font-size:15px;color:' +
                ((Highcharts.theme && Highcharts.theme.contrastTextColor) || '#616161') + '">{y}%</span><br/>' +
                '<span style="font-size:12px;color:silver">de uso</span></div>'
            },
            tooltip: {
                valueSuffix: '%'
            }
        }]

    }



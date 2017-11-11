import * as Highcharts from 'highcharts';


export function drawDemoChart(elementId: string) {

    var options: Highcharts.Options = {
        title: { text: "Such Title" },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },

        series: [{
            name: 'Installation',
            data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
        }]
    };
    
    Highcharts.chart(elementId, options);
}

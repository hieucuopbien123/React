// Barchart có style mode k hoạt động

import React from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

const options = {
    chart: {
        type: 'column',
        styledMode: true
    },

    title: {
        text: 'Styling axes and columns'
    },

    yAxis: [{
        className: 'highcharts-color-0',
        title: {
            text: 'Primary axis'
        }
    }, {
        className: 'highcharts-color-1',
        opposite: true,
        title: {
            text: 'Secondary axis'
        }
    }],

    plotOptions: {
        column: {
            borderRadius: 5
        }
    },

    series: [{
        data: [1, 3, 2, 4]
    }, {
        data: [324, 124, 547, 221],
        yAxis: 1
    }]
}

const BarChart = () => {
    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={options}/>
        </div>
    )
}

export default BarChart;
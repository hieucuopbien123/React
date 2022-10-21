// # Các thư viện components / react-highcharts highcharts
// Stock chart

document.addEventListener('DOMContentLoaded', () =>{
    fetch('https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/analytics.csv')
        .then(res => {
            return res.text();
        }).then(csv => {
            //console.log(csv);
        })
    // Éo hiểu sao lỗi
    Highcharts.stockChart('container4', {
        rangeSelector: {
            selected: 1
        },

        title: {
            text: 'AAPL Stock Price'
        },

        series: [{
            name: 'AAPL',
            data: [1,2,4],
            tooltip: {
                valueDecimals: 2
            }
        }]
    });
});

// Tổng hợp đầy đủ options của highcharts thuần
/*
Highcharts.stockChart/chart("", {
    // Custom loại tổng thể
    chart: {
        type: 'line', // Loại chart
        zoomType: 'xy', // Cách zoom
        scrollablePlotArea: { // Scrollbar
            minWidth: 700
        }
    },

    // Custom tooltip khi hover
    tooltip:{
        backgroundColor: "grey",
        borderColor: 'red',
        borderRadius: 20,
        animation: true,
        followPointer: false,
        style:{
            color: "white"
        },
        formatter(){
            let s = `<em>X value</em> - ${this.x}`;
            this?.points.forEach((point) => {
                s += `<br> . <strong>${point.series.name} </strong> - ${this.y}`;
            })
            return s;
        },
        shared: true,
        crosshairs: true
    },

    // Cusstom phần credit
    credits:{
        enabled: false
        text: 'My Custom Credit',
        href: 'https://google.com',
        position: {
            align: 'left',
            x: 10
        },
        style: {
            fontSize: "15px",
            color: "red"
        }
    },
    
    // Custom title
    title: {
        text: 'Our First Chart'
    },
    subtitle: {
        text: 'Source: Google Analytics'
    },

    // Custom trục y
    yAxis:{
        alternateGridColor: "#b7cff7",
        title:{
            text: "Fruits Eaten"
        },
    },
    yAxis: [
    {
        title: {
            text: null
        },
        labels: {
            align: 'left',
            x: 3,
            y: 16,
            format: '{value:.,0f}'
        },
        showFirstLabel: false
    }, 
    {
        linkedTo: 0,
        gridLineWidth: 0,
        opposite: true,
        labels: {
            align: 'right',
            x: -3,
            y: 16,
            format: '{value:.,0f}'
        },
    }],

    // Custom trục x
    xAxis: {
        alternateGridColor: "#b7cff7",

        // Khi trục x là categories
        categories: ['Apples', 'Bananas', 'Oranges'],

        // Khi trục x là thời gian
        tickInterval: 7 * 24 * 3600 * 1000,
        tickWidth: 1,
        gridLineWidth: 1,
    },

    // Custom phần legend của từng đường data
    legend: {
        align: 'left',
        verticalAlign: 'top',
        borderWidth: 0
    },

    // Truyền data và chart
    series: [
        {
            negativeColor: "pink",
            name: 'John',
            data: [1,2,3,7,10,-4,5,6],
            zones: [
                {
                    value: 0,
                    color: "brown"
                },
                {
                    color: "lime"
                }
            ]
            lineWidth: 4,
            marker: {
                radius: 4
            }
        },
        {
            name: 'New users'
        }
        {
            name: 'Jane',
            data: [10,4,8,5,6,7,7,4,4],
        },
        {
            data: [8,5,6,7,4,2]
        },
        {
            data: [[2,10],[4,10],[3,7]] 
        },
        {
            name: "Oc",
            data: [
                {
                    name: "Jack",
                    y: 10,
                    color: "cyan",
                    x: 2
                },
                {
                    name: "Jay",
                    y: 20,
                    color: "black",
                    x: 4
                }
            ]
        }
    ],

    // Truyền data thông qua file
    data: {
        csvURL: './test.csv',
        enablePolling: true,
        dataRefreshRate: 2,
        beforeParse: function (csv) {
            return csv.replace(/\n\n/g, '\n');
        }
    },

    // Chỉnh các thông số khi khi responsive => search docs đi
    responsive: {
        rules: [
            {
                condition:{
                    maxWidth: 1000, // minHeight minWidth maxHeight
                    callback() {
                        return true;
                    }
                },
                chartOptions: {
                    legend: { enabled: false },
                    yAxis: { title: { text: '' }}
                }
            }
        ]
    },

    // Custom màu của từng đường data
    colors: ["red", "green", "yellow", "blue", "black"],

    // Chỉnh cụ thể style khác của từng đường data
    plotOptions: {
        series: {
            cursor: 'pointer',
            className: 'popup-on-click',
            marker: {
                lineWidth: 5
            }
        }
    },
})
 */
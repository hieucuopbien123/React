// # Các thư viện components / react-highcharts highcharts

// Biểu đồ đường tự có scrollbar 
document.addEventListener('DOMContentLoaded', () =>
    Highcharts.chart('container3', {
        chart: {
            // K cần phải làm thủ công
            scrollablePlotArea: {
                minWidth: 700
            }
        },

        data: {
            csvURL: 'https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/analytics.csv',
            beforeParse: function (csv) {
                console.log(csv);
                return csv.replace(/\n\n/g, '\n');
            }
            // Lấy về và làm gì trước khi hiển thị nhưng thông thường thì dùng với react sẽ chơi redux fetch API 
            // bình thường và k chơi kiểu subscribe đâu
        },
        // series: [
        //   {
        //     name: "New User",
        //     data: [`12/18/17,"40,585","48,351"`, `12/27/17,"35,689","42,566"`]
        //   }
        // ],

        title: {
            text: 'Daily sessions at www.highcharts.com'
        },

        subtitle: {
            text: 'Source: Google Analytics'
        },

        xAxis: {
            tickInterval: 7 * 24 * 3600 * 1000, // one week
            tickWidth: 1,
            gridLineWidth: 1,
        },

        yAxis: [{ // left y axis
            title: {
                text: null
            },
            labels: {
                align: 'left',
                x: 3,
                y: 16,
                format: '{value:.,0f}'
            },
            showFirstLabel: false // Tránh đè
        }, 
        { // right y axis
            linkedTo: 0,
            gridLineWidth: 0,
            opposite: true,
            title: {
                text: null
            },
            labels: {
                align: 'right',
                x: -3,
                y: 16,
                format: '{value:.,0f}'
            },
            showFirstLabel: false
        }],

        legend: {
            align: 'left',
            verticalAlign: 'top',
            borderWidth: 0
        },

        tooltip: {
            shared: true,
            crosshairs: true // Đường kẻ dóng hàng dọc khi hover
        },

        plotOptions: {
            series: {
                cursor: 'pointer',
                className: 'popup-on-click',
                marker: {
                    lineWidth: 5
                }
            }
        },

        // series: [
        // {
        //     name: 'All sessions',
        //     lineWidth: 4,
        //     marker: {
        //         radius: 4
        //     }
        // }, {
        //     name: 'New users'
        // }]
    })
);
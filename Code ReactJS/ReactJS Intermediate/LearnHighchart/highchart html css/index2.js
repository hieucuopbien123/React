// # Các thư viện components / react-highcharts highcharts

// Biểu đồ cột
document.addEventListener('DOMContentLoaded', () => {
    const options = {
        chart: {
            type: 'column',
            zoomType: 'xy'
        },
        title: {
            text: 'Our First Chart'
        },
        yAxis: {
            title: {
                text: 'Fruits Eaten'
            }
        },
        responsive: { // Éo hiểu sao k hoạt động
            rules: [
                {
                    condition:{
                        maxWidth: 1000, // minHeight minWidth maxHeight
                        callback() {
                            console.log("Chạy mỗi khi điều kiện width height thỏa mãn");
                            return true; // Thg dùng để check thêm điều kiện gì nx mới cho kích hoạt chẳng hạn
                            // thì kích hoạt cho return true, ngược lại cho return false
                        }
                    },
                    chartOptions: { // Có gần như mọi thứ
                        legend: { enabled: false }, // legend là ghi chú bị mất
                        yAxis: { title: { text: '' }}
                    }
                }
            ]
        }
    };

    // Load data từ file csv

    // $.get('test.csv', csv => {
    //     options.data = {
    //         csv
    //     };
    //     Highcharts.chart('container1', options);
    // });
    // Khi fetch data xong thì gán trường options.data, sau đó mới hiển thị, nếu chưa fetch xong container1 sẽ k có gì
    
    // Dùng fetch bth
    // fetch('test.csv').then(res => {
    //     return res.text();
    // }).then(csv => {
    //     options.data = {
    //         csv
    //     };
    //     Highcharts.chart('container1', options);
    // })

    // Update data in real time: thực ra là sau 1 khoảng thời gian thì request lại data
    options.data = {
        csvURL: './test.csv',
        // enablePolling: true, // enable update real time
        dataRefreshRate: 2, // mỗi 2s request 1 lần
    }
    Highcharts.chart('container1', options);
})
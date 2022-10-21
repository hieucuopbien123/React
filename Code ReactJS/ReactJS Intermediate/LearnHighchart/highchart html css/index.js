// # Các thư viện components / react-highcharts highcharts
// Biểu đồ đường

document.addEventListener('DOMContentLoaded', () =>{
    Highcharts.chart('container', {
        chart: {
            type: 'line', // bar, area, scatter, column, areaspline, linespline
            zoomType: 'xy' // y, x => cột phải đủ dài mới zoom được
        },
        tooltip:{
            backgroundColor: "grey",
            borderColor: 'red',
            borderRadius: 20,
            // animation: true, // false sẽ jump around
            // followPointer: false,
            style:{
                color: "white"
            },
            // formatter(){
            //     console.log(this);
            //     let s = `<em>X value</em> - ${this.x}`;
            //     this?.points.forEach((point) => {
            //         // Để có points phải cho shared là true, nếu là false nó chỉ có 1 điểm point
            //         s += `<br> . <strong>${point.series.name} </strong> - ${this.y}`;
            //     })
            //     return s;
            // },
            // shared: true // dùng shared: true; thì trả ra mảng các cột luôn chứ k chỉ 1 giá trị
        },
        colors: ["red", "green", "yellow", "blue", "black"],
        credits:{
            // enabled: false
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
        title: {
            text: 'Our First Chart'
        },
        yAxis:{
            alternateGridColor: "#b7cff7",
            title:{
                text: "Fruits Eaten"
            }
        },
        xAxis: {
            alternateGridColor: "#b7cff7",
            categories: ['Apples', 'Bananas', 'Oranges']//tiếp sau cái này tự đánh số tiếp trục x
        },
        series: [
            {
                negativeColor: "pink",
                name: 'John',
                data: [1,2,3,7,10,-4,5,6],
                zones: [
                    {
                        value: 0,
                        color: "brown" // <= 0 thì nâu
                    },
                    {
                        value: 5,
                        color: "black",
                    },
                    {
                        color: "lime" // còn lại là màu lime
                    }
                ]
            },
            {
                name: 'Jane',
                data: [10,4,8,5,6,7,7,4,4],
            },
            {
                name: 'Alice',
                data: [2,8,5,6,7,4]
            },
            {
                data: [8,5,6,7,4,2] // tên tự động như cứt
            },
            {
                data: [[2,10],[4,10],[3,7]] 
                // Syntax: [giá trị x, giá trị y] nó khi trục x k cho theo thứ tự thì nó in ra ảo
            },
            {
                name: "Oc",
                data: [
                    {
                        name: "Jack", // Jack tự thay cho giá trị trục x của cái data này
                        y: 10,
                        color: "cyan",
                        x: 2
                    },
                    {
                        name: "Jay", // Jay là giá trị trục x của cái data này
                        y: 20,
                        color: "black",
                        x: 4
                    }
                ]
            }
        ]
    })
})
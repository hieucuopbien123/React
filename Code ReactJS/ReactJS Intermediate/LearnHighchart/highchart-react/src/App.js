// # Các thư viện components / highcharts-react-official highcharts

// Dùng drilldown
import React from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import drilldown from "highcharts/modules/drilldown";

import BarChart from"./BarChart";
import BarChartV2 from"./BarChartV2";
import BarChartV3 from"./BarChartV3";

import StockChart from "./StockChart";
import StockChart2 from "./StockChart2";
import StockChart3 from "./StockChartV3";
import StockChart4 from "./StockChartV4";
import SplineChart from "./SplineChart";

drilldown(Highcharts); // Cách dùng 1 module như drilldown

const options = {
  chart: {
    type: 'column'
  },
  title: {
    text: 'Basic drilldown'
  },
  xAxis: {
    type: 'category'
  },
  legend: {
    enabled: false, // Khi dùng drilldown thì cái legend éo có ý nghĩa gì
    // enabled: true
  },
  plotOptions: { // Thêm các thuộc tính riêng đặc biệt cho từng cái gì
    series: {
      allowPointSelect: true
    }
  },
  series: [
    {
      name: 'Thing',
      colorByPoint: true, // Trong cùng 1 kiểu dữ liệu màu các điểm y trên trục x khác nhau. Ở đây
      // là tự động, ta có thể custom cái màu này với trường color trong data
      data: [
        {
          name: 'Animals',
          y: 5,
          drilldown: 'animals'
        },
        {
          name: 'Fruits',
          y: 2,
          drilldown: 'fruits'
        },
        {
          name: "Cars",
          y: 4,
          drilldown: 'cars'
        }
      ]
    }
  ],
  drilldown: {
    series: [
      {
        id: 'animals',
        data: [['Cats', 4], ['Dogs', 2], ['Cows', 1], ["Sheep",2], ["Pigs",1]]
        // Có thể recursive nhiều level thoải mái ở đây, cho cái data này lại giống bên trên
      },
      {
        id: 'fruits',
        data: [
          {
            name: "Apples",
            y: 4,
            drilldown: "apple1"
          },
          {
            name: "Oranges",
            y: 2,
          },
        ],
      },
      {
        id: "apple1",
        // Nó như 1 thành phần của series nhưng k hiện vì có id mà đợi cái drilldown gọi cái id này mới hiện
        data: [
          {
            name: 'Apple loại 1',
            y: 200
          },
          {
            name: 'Apple loại 2',
            y: 100
          },
        ]
      },
      {
        id: 'cars',
        data: [['Toyota', 3], ["Opel", 2], ["Volkswagen",2]]
      }
    ]
  }
}

const App = () => {
  return (
    <div style={{marginTop: "10px"}}>
      <HighchartsReact highcharts={Highcharts} options={options}/>
      <div>
        <StockChart4/>
      </div>
    </div>
  )
}

export default App;
// Barchart

import React from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

const testData = [
  {
    type: "column",
    name: "Buy",
    values: [13, 15, 14, 12, 11, 15, 14, 12, 12, 10, 13, 12.5, 11, 11, 11]
  },
  {
    type: "column",
    name: 'Sell',
    values: [14, 13.5, 11, 11, 13, 12.5, 11, 11, 14.5, 14.5, 12, 10, 10, 13, 10, 13, 13, 12, 14, 14.5, 12.5, 12, 13]
  }, 
  {
    type: "line",
    name: 'Completed',
    values: [14, 13.5, 11, 11, 13, 12.5, 11, 11, 14.5, 14.5, 12, 10, 10, 13, 10, 13, 13, 12, 14, 14.5, 12.5, 12, 13]
  }
]

const getMaxSize = () => {
  var maxSize = 0;
  for(var i = 0; i < testData.length; i++){
    maxSize = Math.max(maxSize, testData[i].values.length);
  }
  return maxSize;
}

const series = testData.map((item, index) => {
  return {
    type: item.type,
    name: item.name,
    data: item.values.map((data, index) => {
      return {
        y: data,
        x: 11/getMaxSize()*index - 0.3,
        name: ""
      }
    })
  }
})

const options = {
  colors: ["#147AD6", "#BDC4D0", "red"],
  chart: {
    backgroundColor: "#051327"
  },
  title: {
    text: ''
  },
  xAxis: {
    categories: [
      "21:00", "28. Dec", "03:00", "06:00", "09:00", "12:00", "15:00",
      "18:00", "20:00", "22:00", "29. Dec", "03:00"
    ],
    tickInterval: 1,
    tickWidth: 0.5,
    min: 0,
    max: 10,
    labels:{
      style: {
        color: "#A6BBD4",
      },
    }
  },
  plotOptions: {
    column: {
      groupPadding: 0.3,
      pointWidth: 15,
      borderRadius: "2px",
    },
    series: {
      borderWidth: 0,
      borderColor: 'black'
    }
  },
  legend: {
    align: 'left',
    verticalAlign: 'top',
    lnayout: "horizotal",
    itemStyle: {
      color: "white"
    }
  },
  yAxis: {
    min: 0,
    title: {
      text: '<em>Volume ($)</em>',
      style: {
        color: "#A6BBD4"
      }
    },
    labels:{
      style: {
        color: "#A6BBD4"
      }
    },
    gridLineColor: "#354961"
  },
  tooltip: {
    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
      '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
    footerFormat: '</table>',
    shared: true,
    useHTML: true
  },
  // series: [
  //   {
  //     type: "column",
  //     name: "Buy",
  //     data: [13, 15, 14, 12, 11, 15, 14, 12, 12, 10, 13, 12.5, 11, 11, 11]
  //   },
  //   {
  //     type: "column",
  //     name: 'Sell',
  //     data: [14, 13.5, 11, 11, 13, 12.5, 11, 11, 14.5, 14.5, 12, 10, 10, 13, 10]
  //   }, 
  //   {
  //     type: "line",
  //     name: 'Completed',
  //     data: [14, 13.5, 11, 11, 13, 12.5, 11, 11, 14.5, 14.5, 12, 10, 10, 13, 10]
  //   }
  // ]
  series: series
}

const BarChart = () => {
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options}/>
    </div>
  )
}

export default BarChart;

/* 
// Tổng hợp options của highchart barchart
const options = {
  // Chính color của từng đường
  colors: ["#147AD6", "#BDC4D0", "red"],

  // Chỉnh tổng thể chart
  chart: {
    backgroundColor: "#051327",
    borderRadius: "2px",
    type: 'column',
    styledMode: false, // K dùng cái mode này
  },

  // Phần credit
  credits: {
    enabled: false
  },

  // Chỉnh title
  title: {
    text: ''
  },

  // Chỉnh trục x
  xAxis: {
    categories: [
      "21:00", "28. Dec", "03:00"
    ],
    tickInterval: 1,
    tickWidth: 0.5,
    tickmarkPlacement: "center",
    min: 0,
    max: 10,
    labels:{
      y: 30,
      style: {
        color: "#A6BBD4",
      },
    }
  },

  // Chỉnh từng phần data hiển thị
  plotOptions: {
    // Custom style từng group cột
    column: {
      groupPadding: 0.3,
      pointWidth: 15,
      borderRadius: "2px",
    },
    // Custom style tưng cột
    series: {
      borderWidth: 0,
      borderColor: 'black'
    }
  },

  // Chỉnh legend
  legend: {
    align: 'left',
    verticalAlign: 'top',
    layout: "horizotal",
    margin: 30,
    y: 10,
    itemStyle: {
      color: "white"
    }
  },

  // Chỉnh trục y
  yAxis: {
    min: 0,
    title: {
      text: '<em>Volume ($)</em>',
      style: {
        color: "#A6BBD4"
      }
    },
    labels:{
      style: {
        color: "#A6BBD4"
      }
    },
    gridLineColor: "#354961"
  },

  // Khi trục y có 2 bên
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
  
  // Chỉnh format cho tooltip
  tooltip: {
    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
      '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
    footerFormat: '</table>',
    shared: true,
    useHTML: true
  },
  
  // Chỉnh data truyền vào
  series: [
    {
      type: "column",
      name: "Buy",
      data: [13, 15, 14, 12, 11, 15, 14, 12, 12, 10, 13, 12.5, 11, 11, 11]
    },
    {
      type: "line",
      name: 'Completed',
      data: [
        {
          y: 1,
          x: 1,
          name: ""
        },
        {
          y: 1,
          x: 2,
          name: ""
        }
      ]
    },
    {
      data: [324, 124, 547, 221],
      yAxis: 1
    }
  ]
}
*/
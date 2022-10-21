// Barchart

import React from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

const testData = [
  {
    type: "column",
    name: "Buy",
    values: [13, 15, 14, 12, 11, 15, 14, 12, 12, 10, 13, 12.5, 11, 11, 11]
  },
  {
    type: "column",
    name: "Sell",
    values: [14, 13.5, 11, 11, 13, 12.5, 11, 11, 14.5, 14.5, 12, 10, 10, 13, 10, 13, 13, 12, 14, 14.5, 12.5, 12, 13]
  }, 
  {
    type: "line",
    name: "Completed",
    values: [14, 13.5, 11, 11, 13, 12.5, 11, 11, 14.5, 14.5, 12, 10, 10, 13, 10, 13, 13, 12, 14, 14.5, 12.5, 12, 13]
  }
];

const getMaxSize = () => {
  var maxSize = 0;
  for(var i = 0; i < testData.length; i++){
    maxSize = Math.max(maxSize, testData[i].values.length);
  }
  return maxSize;
};

const series = testData.map((item, index) => {
  return {
    type: item.type,
    name: item.name,
    data: item.values.map((data, index) => {
      return {
        y: data,
        x: 11/getMaxSize()*index + 0.2,
        // Vì 0.29 dôi phần đầu và phần cuối dôi thừa 1 cái thôi, lên + 0.1 nx là 0.39 vẫn ok
        name: ""
      };
    })
  };
});

const options = {
  colors: ["#147AD6", "#BDC4D0", "red"],
  credits: {
    enabled: false
  },
  chart: {
    backgroundColor: "#16243B",
    borderRadius: "2px"
  },
  title: {
    text: ""
  },
  xAxis: {
    categories: [
      "21:00", "28. Dec", "03:00", "06:00", "09:00", "12:00", "15:00",
      "18:00", "20:00", "22:00", "29. Dec", "03:00"
    ],
    tickInterval: 1,
    tickWidth: 0.5,
    tickmarkPlacement: "center",
    min: 0.5,
    max: 10.5,
    labels:{
      y: 30,
      style: {
        color: "#A6BBD4",
      },
    }
  },
  plotOptions: {
    column: {
      groupPadding: 0.35,
      pointWidth: 15,
      borderRadius: "2px",
    },
    series: {
      borderWidth: 0,
      borderColor: "black"
    }
  },
  legend: {
    align: "left",
    verticalAlign: "top",
    layout: "horizontal",
    margin: 30,
    y: 10,
    itemStyle: {
      color: "white"
    }
  },
  yAxis: {
    min: 0,
    title: {
      text: "<em>Volume ($)</em>",
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
    headerFormat: "<span style='font-size:10px'>{point.key}</span><table>",
    pointFormat: "<tr><td style='color:{series.color};padding:0'>{series.name}: </td>" +
      "<td style='padding:0'><b>{point.y:.1f} mm</b></td></tr>",
    footerFormat: "</table>",
    shared: true,
    useHTML: true
  },
  series: series
};

const BarChart = () => {
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options}/>
    </div>
  );
};

export default BarChart;
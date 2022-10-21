// Spline chart
// Dùng các props khác cuủa HighchartsReact

import React from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

const options = {
  title: {
    text: 'My stock chart'
  },
  chart: {
    type: "spline"
  },
  series: [
    {
      data: [1, 2, 1, 4, 3, 6, 7, 3, 8, 6, 9]
    }
  ]
};

const SplineChart = () => (
  <div>
    <HighchartsReact
      options = { options }
      highcharts = { Highcharts }
      constructorType = { 'stockChart' }
      allowChartUpdate = { true }
      immutable = { false }
      updateArgs = { [true, true, true] }
      containerProps = {{ className: 'chartContainer' }}
    />
  </div>
);

export default SplineChart;
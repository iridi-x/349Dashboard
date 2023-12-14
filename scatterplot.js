import React from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';


function Scatterplot({covidData}) {

  console.log("chart Data: ", covidData);

  ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

   const options = {
    scales: {
      y: {
        beginAtZero: true,
        scaleLabel: {
          display: true,
          labelString: 'X-Axis Label', // X-axis label
        },
      },
      x: {
        title: "Cases",
        
      },
    },
  };

  const data = {
    datasets: covidData.map((covidData) => ({
      label: covidData.continent,
      data: [
        {
          x: covidData.cases,
          y: covidData.deaths,
        },
      ],
      backgroundColor: 'rgba(255, 30, 100, 1)',

    })),
  };

    return <Scatter options={options} data={data} />;
}

export default Scatterplot;

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

  // debug statement
  // console.log("chart Data: ", covidData);

  ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

   const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Deaths',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Total Confirmed Cases',
        },
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

    return (
      <div>
      <h3>Cases and Deaths per Continent</h3>
    <Scatter options={options} data={data} />
      </div>
    )
}

export default Scatterplot;

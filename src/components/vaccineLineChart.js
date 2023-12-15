import React from 'react';
import {
  Chart as ChartJS,
  Tooltip, //these two are optional < \/
  Legend,

  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register( LineElement,
  CategoryScale,
  LinearScale,
  PointElement)

function LineChart({covidData}) {

  const dates = Object.keys(covidData);
  const values = Object.values(covidData);

  const chartData = {
    labels: dates,
    datasets: [
      {
        label: 'Total Vaccinations Over Time',
        data: values,
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        type: 'category',
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Global Vaccine Doses Delivered',
        },
      },
    },
  };
  return(
    <div> 
      <h3>Global Vaccination doses Administered over One Year</h3>
    <Line data={chartData} options={chartOptions}/>
    </div>
    )
}

export default LineChart;
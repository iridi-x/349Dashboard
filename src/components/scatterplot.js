import React from 'react';
import { Chart as ChartJS, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import { Scatter } from 'react-chartjs-2';

function Scatterplot({ covidData }) {
  ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

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
      backgroundColor: getRandomColor(),
    })),
  };

  return (
    <div>
      <h3>Cases and Deaths per Continent</h3>
      <Scatter options={options} data={data} />
    </div>
  );
}

export default Scatterplot;


import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from 'chart.js/auto';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

function BarChart({ covidData }) {
  const chartData = {
    datasets: covidData.map((data) => ({
      label: data.continent,
      data: [{ x: data.continent, y: data.tests }],
      backgroundColor: ['rgb(255, 159, 64)'],
      barThickness: 20, // Adjust the width of the bars
    })),
  };

  const chartOptions = {
    scales: {
      x: {
        type: 'category',
        title: {
          display: true,
          text: 'Continent',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Covid-19 Tests Taken',
        },
      },
    },
  };

  return (
    <div>
      <h3>Number of Covid-19 Tests Taken Per Continent</h3>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
}

export default BarChart;
import React from 'react';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from 'chart.js/auto';
import { Pie } from 'react-chartjs-2';

ChartJS.register( LineElement,
  CategoryScale,
  LinearScale,
  PointElement)

function PieChart({covidData}) {
    const chartData = {
        labels: ['Cases', 'Deaths', 'Recovered'],
        datasets: [
          {
            data: [covidData.cases, covidData.deaths, covidData.recovered],
            backgroundColor: ['rgba(255, 99, 132, 0.7)', 'rgba(255, 205, 86, 0.7)', 'rgba(75, 192, 192, 0.7)'],
            borderWidth: 1,
          },
        ],
      };

  return(
    <div> 
      <h3>Distribution of Cases, Recoveries, and Deaths</h3>
    <Pie data={chartData}/>
    </div>
    )
}

export default PieChart;
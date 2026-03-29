import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart({ game }) {

  if (!game) return <p style={{ color: 'white' }}>Select a game to see chart</p>;

  const data = {
    labels: ['Total Positive', 'Total Negative'],
    datasets: [
      {
        data: [
          game.reviews.total_positive,
          game.reviews.total_negative,
        ],
        backgroundColor: ['#4CAF50', '#e74c3c'],
        borderColor: ['#4CAF50', '#e74c3c'],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { 
        position: 'bottom',
        labels: { color: 'white' }
      },
      title: { 
        display: true, 
        text: game.details.name,
        color: 'white',
        font: { size: 16 }
      },
    },
  };

  return <Pie data={data} options={options} />;
}

export default PieChart;

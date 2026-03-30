import { Bar } from 'react-chartjs-2';
import {Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend,} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function BarChart({ game1, game2 }) {

  if (!game1 || !game2) return <p style={{ color: 'white' }}>Select 2 games to see chart</p>;

  const data = {
    labels: [game1.details.name, game2.details.name],
    datasets: [
      {
        label: 'Review Score',
        data: [
          game1.reviews.review_score,
          game2.reviews.review_score,
        ],
        backgroundColor: ['#3498db', '#e74c3c'],
      },
      {
        label: 'Total Positive (hundreds)',
        data: [
          game1.reviews.total_positive / 100,
          game2.reviews.total_positive / 100,
        ],
        backgroundColor: ['#4CAF50', '#F0B53B'],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { 
        position: 'top',
        labels: { color: 'white' }
      },
      title: { 
        display: true, 
        text: 'Review Score Comparison',
        color: 'white',
        font: { size: 16 }
      },
    },
    scales: {
      y: { 
        beginAtZero: true,
        ticks: { color: 'white' },
        grid: { color: 'rgba(255,255,255,0.1)' }
      },
      x: { 
        ticks: { color: 'white' },
        grid: { color: 'rgba(255,255,255,0.1)' }
      }
    },
  };

  return <Bar data={data} options={options} />;
}

export default BarChart;
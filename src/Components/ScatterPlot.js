import { Scatter } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend, Title);

function ScatterPlot({ game1, game2 }) {

  if (!game1 || !game2) return <p style={{ color: 'white' }}>Select 2 games to see chart</p>;

  const data = {
    datasets: [
      {
        label: game1.details.name,
        data: [{
          x: game1.details.price_overview?.final / 100 || 0,
          y: game1.reviews.review_score,
        }],
        backgroundColor: '#3498db',
        pointRadius: 10,
      },
      {
        label: game2.details.name,
        data: [{
          x: game2.details.price_overview?.final / 100 || 0,
          y: game2.reviews.review_score,
        }],
        backgroundColor: '#e74c3c',
        pointRadius: 10,
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
        text: 'Price vs Review Score',
        color: 'white',
        font: { size: 16 }
      },
    },
    scales: {
      y: { 
        title: { display: true, text: 'Review Score', color: 'white' },
        ticks: { color: 'white' },
        grid: { color: 'rgba(255,255,255,0.1)' }
      },
      x: { 
        title: { display: true, text: 'Price (USD)', color: 'white' },
        ticks: { color: 'white' },
        grid: { color: 'rgba(255,255,255,0.1)' }
      }
    },
  };

  return <Scatter data={data} options={options} />;
}

export default ScatterPlot;
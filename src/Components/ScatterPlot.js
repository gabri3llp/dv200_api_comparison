
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
  if (!game1 || !game2) {
    return (
      <p style={{ color: 'white' }}>
        Select 2 games to see chart
      </p>
    );
  }

  const getDataset = (game, color) => {
    const details = game.details ?? {};
    const reviews = game.reviews ?? {};

    const price = details.price_overview?.final != null
      ? Number(details.price_overview.final) / 100
      : details.is_free
        ? 0
        : null;

    const score = reviews.review_score;

    const validData =
      price !== null &&
      Number.isFinite(price) &&
      score != null &&
      Number.isFinite(Number(score));

    return {
      label: details.name ?? 'Unknown game',
      data: validData
        ? [{
            x: price,
            y: Number(score),
          }]
        : [],
      backgroundColor: color,
      borderColor: color,
      pointRadius: 9,
      pointHoverRadius: 13,
    };
  };

  const data = {
    datasets: [
      getDataset(game1, '#3498db'),
      getDataset(game2, '#e74c3c'),
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'white',
          padding: 15,
        },
      },
      title: {
        display: true,
        text: 'Price vs Steam Review Category',
        color: 'white',
        font: {
          size: 16,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const name = context.dataset.label;
            const price = context.parsed.x.toFixed(2);
            const score = context.parsed.y;

            return `${name}: $${price} | Steam category: ${score}/9`;
          },
        },
      },
    },
    scales: {
      y: {
        min: 1,
        max: 9,
        title: {
          display: true,
          text: 'Steam Review Category (1–9)',
          color: 'white',
        },
        ticks: {
          color: 'white',
          stepSize: 1,
        },
        grid: {
          color: 'rgba(255,255,255,0.1)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Price (USD)',
          color: 'white',
        },
        ticks: {
          color: 'white',
        },
        grid: {
          color: 'rgba(255,255,255,0.1)',
        },
      },
    },
  };

  return (
    <div style={{
      padding: '22px',
      height: '420px',
      borderRadius: '18px',
      background: `
        linear-gradient(
          135deg,
          rgba(105,75,190,0.15),
          rgba(30,130,190,0.10)
        ),
        rgba(15,20,38,0.65)
      `,
      backdropFilter: 'blur(18px)',
      WebkitBackdropFilter: 'blur(18px)',
      border: '1px solid rgba(255,255,255,0.13)',
      boxShadow: '0 0 28px rgba(105,75,190,0.13)',
    }}>
      <Scatter data={data} options={options} />
    </div>
  );
}

export default ScatterPlot;

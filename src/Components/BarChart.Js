
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function BarChart({ game1, game2 }) {
  if (!game1 || !game2) {
    return (
      <p style={{ color: 'white' }}>
        Select 2 games to see chart
      </p>
    );
  }

  const games = [game1, game2];

  const getPercentages = (reviews) => {
    const positive = Number(reviews?.total_positive ?? 0);
    const negative = Number(reviews?.total_negative ?? 0);
    const total = positive + negative;

    if (total === 0) {
      return { positive: null, negative: null };
    }

    return {
      positive: Number(((positive / total) * 100).toFixed(1)),
      negative: Number(((negative / total) * 100).toFixed(1)),
    };
  };

  const percentages = games.map(game =>
    getPercentages(game.reviews)
  );

  const data = {
    labels: games.map(game =>
      game.details?.name ?? 'Unknown game'
    ),
    datasets: [
      {
        label: 'Positive Reviews',
        data: percentages.map(p => p.positive),
        backgroundColor: 'rgba(76,175,80,0.85)',
        borderColor: '#4CAF50',
        borderWidth: 1,
        borderRadius: 7,
      },
      {
        label: 'Negative Reviews',
        data: percentages.map(p => p.negative),
        backgroundColor: 'rgba(231,76,60,0.85)',
        borderColor: '#e74c3c',
        borderWidth: 1,
        borderRadius: 7,
      },
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
          padding: 18,
        },
      },
      title: {
        display: true,
        text: 'Positive vs Negative Review Percentage',
        color: 'white',
        font: {
          size: 16,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) =>
            `${context.dataset.label}: ${
              context.raw == null ? 'Unavailable' : `${context.raw}%`
            }`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          color: 'white',
          callback: value => `${value}%`,
        },
        grid: {
          color: 'rgba(255,255,255,0.1)',
        },
      },
      x: {
        ticks: {
          color: 'white',
        },
        grid: {
          display: false,
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
      <Bar data={data} options={options} />
    </div>
  );
}

export default BarChart;

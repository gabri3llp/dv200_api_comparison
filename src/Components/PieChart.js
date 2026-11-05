import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart({ game }) {
  if (!game) {
    return (
      <div style={{
        color: 'rgba(255,255,255,0.6)',
        padding: '30px',
        textAlign: 'center',
      }}>
        Select a game to see its review breakdown.
      </div>
    );
  }

  const reviews = game.reviews;

  if (
    !reviews ||
    reviews.total_positive == null ||
    reviews.total_negative == null
  ) {
    return (
      <div style={{
        color: 'rgba(255,255,255,0.6)',
        padding: '30px',
        textAlign: 'center',
      }}>
        Review data unavailable for this game.
      </div>
    );
  }

  const positive = Number(reviews.total_positive);
  const negative = Number(reviews.total_negative);
  const total = positive + negative;

  const data = {
    labels: ['Positive Reviews', 'Negative Reviews'],
    datasets: [
      {
        data: [positive, negative],
        backgroundColor: [
          'rgba(76,175,80,0.9)',
          'rgba(231,76,60,0.9)',
        ],
        borderColor: [
          '#4CAF50',
          '#e74c3c',
        ],
        borderWidth: 2,
        hoverOffset: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: 'rgba(255,255,255,0.85)',
          padding: 16,
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      title: {
        display: true,
        text: game.details?.name ?? 'Game Reviews',
        color: 'white',
        font: {
          size: 15,
          weight: 'bold',
        },
        padding: {
          bottom: 15,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = Number(context.raw);
            const percentage = total > 0
              ? ((value / total) * 100).toFixed(1)
              : '0.0';

            return `${context.label}: ${value.toLocaleString()} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div style={{
      width: '100%',
      maxWidth: '310px',
      padding: '20px',
      borderRadius: '16px',
      background: `
        linear-gradient(
          135deg,
          rgba(105,75,190,0.13),
          rgba(30,130,190,0.09)
        ),
        rgba(15,20,38,0.55)
      `,
      backdropFilter: 'blur(15px)',
      WebkitBackdropFilter: 'blur(15px)',
      border: '1px solid rgba(255,255,255,0.12)',
      boxShadow: '0 0 25px rgba(105,75,190,0.12)',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '230px',
        margin: '0 auto',
      }}>
        <Pie data={data} options={options} />
      </div>
    </div>
  );
}

export default PieChart;

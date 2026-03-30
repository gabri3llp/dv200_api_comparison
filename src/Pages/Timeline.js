import { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {Chart as ChartJS,CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend,} from 'chart.js';
import TlHero from '../Components/TlHeror';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const TIMELINE_GAMES = [
  { id: 367520,  name: "Hollow Knight",  color: '#F0B53B' },
  { id: 632360,  name: "Risk of Rain 2", color: '#4CAF50' },
  { id: 1091500, name: "Cyberpunk 2077", color: '#e74c3c' },
  { id: 1229490, name: "ULTRAKILL",      color: '#3498db' },
  { id: 1245620, name: "Elden Ring",     color: '#9b59b6' },
  { id: 1086940, name: "Baldurs Gate 3", color: '#e67e22' },
  { id: 2379780, name: "Balatro",        color: '#1abc9c' },
];

function Timeline() {

  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState('total_positive');

  useEffect(() => {
    const fetchAllGames = async () => {
      try {
        const PROXY = "https://proxy.corsfix.com/?";

        const results = await Promise.all(
          TIMELINE_GAMES.map(async (game) => {
            const detailsResponse = await axios.get(
              `${PROXY}https://store.steampowered.com/api/appdetails?appids=${game.id}&cc=us`
            );
            const reviewsResponse = await axios.get(
              `${PROXY}https://store.steampowered.com/appreviews/${game.id}?json=1`
            );

            return {
              name: game.name,
              color: game.color,
              release_date: detailsResponse.data[game.id].data.release_date.date,
              reviews: reviewsResponse.data.query_summary,
            };
          })
        );

        results.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
        setGames(results);
        setLoading(false);

      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
      }
    };

    fetchAllGames();
  }, []);

  const properties = [
    { value: 'total_positive', label: 'Total Positive Reviews' },
    { value: 'total_negative', label: 'Total Negative Reviews' },
    { value: 'total_reviews',  label: 'Total Reviews' },
    { value: 'review_score',   label: 'Review Score' },
    { value: 'num_reviews',    label: 'Number of Reviews' },
  ];

  const chartData = {
    labels: games.map(g => g.release_date),
    datasets: [
      {
        label: properties.find(p => p.value === selectedProperty)?.label,
        data: games.map(g => g.reviews[selectedProperty]),
        borderColor: '#F0B53B',
        backgroundColor: '#F0B53B',
        pointBackgroundColor: games.map(g => g.color),
        pointBorderColor: games.map(g => g.color),
        pointRadius: 12,
        pointHoverRadius: 16,
        tension: 0.3,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Game Stats Over Time',
        color: 'white',
        font: { size: 18 }
      },
      tooltip: {
        callbacks: {
          title: (items) => games[items[0].dataIndex]?.name,
          afterLabel: (item) => `Release: ${games[item.dataIndex]?.release_date}`,
        }
      }
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

  if (loading) return <p style={{ color: 'white', padding: '20px' }}>Loading timeline...</p>;

  return (
    <div>
      <TlHero />
      <section style={{ padding: '40px' }}>

        <h2 style={{ backgroundColor: '#F0B53B', color: '#1B2C44', padding: '10px 20px', width: 'fit-content' }}>GAME TIMELINE</h2>

        <div style={{ marginTop: '20px', marginBottom: '20px' }}>
          <select
            value={selectedProperty}
            onChange={(e) => setSelectedProperty(e.target.value)}
            style={{ padding: '10px', fontSize: '16px', borderRadius: '5px',backgroundColor: '#F0B53B',color: '#1B2C44', border: 'none',cursor: 'pointer' }}>
            {properties.map(p => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '20px' }}>
          {games.map(game => (
            <div key={game.name} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ 
                width: '15px', 
                height: '15px', 
                borderRadius: '50%', 
                backgroundColor: game.color 
              }}></div>
              <span style={{ color: 'white', fontSize: '14px' }}>{game.name}</span>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: 'rgba(0,0,0,0.2)', padding: '20px', borderRadius: '10px' }}>
          <Line data={chartData} options={options} />
        </div>

      </section>
    </div>
  );
}

export default Timeline;
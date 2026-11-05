
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import TlHero from '../Components/TlHeror';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const PROXY = 'https://proxy.corsfix.com/?';

const TIMELINE_GAMES = [
  { id: 367520, name: 'Hollow Knight', color: '#F0B53B' },
  { id: 632360, name: 'Risk of Rain 2', color: '#4CAF50' },
  { id: 1091500, name: 'Cyberpunk 2077', color: '#e74c3c' },
  { id: 1229490, name: 'ULTRAKILL', color: '#3498db' },
  { id: 1245620, name: 'Elden Ring', color: '#9b59b6' },
  { id: 1086940, name: 'Baldur\'s Gate 3', color: '#e67e22' },
  { id: 2379780, name: 'Balatro', color: '#1abc9c' },
];

async function fetchSteamReviews(appId) {
  const input = {
    appid: Number(appId),
    filter: 0,
    review_type: 0,
    purchase_type: 1,
    languages: ['all'],
    num_per_page: 20,
  };

  const steamUrl =
    `https://api.steampowered.com/IUserReviewsService/GetAppReviews/v1/?input_json=${encodeURIComponent(
      JSON.stringify(input)
    )}`;

  const proxyUrl = `${PROXY}${steamUrl}`;

  const response = await axios.get(proxyUrl);

  return response.data?.response?.query_summary ?? null;
}

async function fetchGame(game) {
  const detailsResponse = await axios.get(
    `${PROXY}https://store.steampowered.com/api/appdetails?appids=${game.id}&cc=us`
  );

  const appData = detailsResponse.data?.[game.id];

  if (!appData?.success || !appData?.data) {
    throw new Error(`Steam details unavailable for ${game.name}`);
  }

  const details = appData.data;

  if (!details.release_date?.date) {
    throw new Error(`Release date unavailable for ${game.name}`);
  }

  const reviews = await fetchSteamReviews(game.id);

  if (!reviews) {
    throw new Error(`Review summary unavailable for ${game.name}`);
  }

  return {
    name: game.name,
    color: game.color,
    release_date: details.release_date.date,
    reviews,
  };
}

function Timeline() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] =
    useState('total_positive');

  const [failedGames, setFailedGames] = useState([]);

  useEffect(() => {
    let cancelled = false;

    const fetchAllGames = async () => {
      const validGames = [];
      const failed = [];

      try {
        for (const game of TIMELINE_GAMES) {
          if (cancelled) return;

          try {
            const result = await fetchGame(game);
            validGames.push(result);

            console.log(`Timeline data loaded: ${game.name}`, result);
          } catch (error) {
            failed.push(game.name);

            console.warn(
              `Could not retrieve ${game.name}:`,
              error.response?.status,
              error.response?.data,
              error.message
            );
          }
        }

        validGames.sort((a, b) => {
          return (
            new Date(a.release_date).getTime() -
            new Date(b.release_date).getTime()
          );
        });

        if (!cancelled) {
          setGames(validGames);
          setFailedGames(failed);
        }
      } catch (error) {
        console.error('Timeline error:', error);

        if (!cancelled) {
          setGames([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchAllGames();

    return () => {
      cancelled = true;
    };
  }, []);

  const properties = [
    { value: 'total_positive', label: 'Total Positive Reviews' },
    { value: 'total_negative', label: 'Total Negative Reviews' },
    { value: 'total_reviews', label: 'Total Reviews' },
    { value: 'review_score', label: 'Review Score' },
  ];

  const selectedLabel =
    properties.find(p => p.value === selectedProperty)?.label ??
    'Game Statistics';

  const chartData = {
    labels: games.map(g => g.release_date),

    datasets: [
      {
        label: selectedLabel,

        data: games.map(g => {
          const value = g.reviews?.[selectedProperty];
          return value != null ? Number(value) : null;
        }),

        borderColor: '#F0B53B',
        backgroundColor: 'rgba(240,181,59,0.15)',
        pointBackgroundColor: games.map(g => g.color),
        pointBorderColor: games.map(g => g.color),
        pointRadius: 8,
        pointHoverRadius: 12,
        pointBorderWidth: 2,
        tension: 0.3,
        fill: true,
        spanGaps: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },

      title: {
        display: true,
        text: 'Game Statistics Over Time',
        color: 'white',
        font: {
          size: 18,
        },
        padding: {
          bottom: 25,
        },
      },

      tooltip: {
        backgroundColor: 'rgba(15,20,38,0.95)',
        borderColor: 'rgba(255,255,255,0.15)',
        borderWidth: 1,
        padding: 12,

        callbacks: {
          title: (items) =>
            games[items[0].dataIndex]?.name ?? 'Unknown game',

          label: (item) => {
            const value = item.raw;

            if (value == null) return 'Data unavailable';

            if (selectedProperty === 'review_score') {
              return `Review score: ${value}/10`;
            }

            return `${selectedLabel}: ${Number(value).toLocaleString()}`;
          },

          afterLabel: (item) =>
            `Release: ${
              games[item.dataIndex]?.release_date ?? 'Unknown'
            }`,
        },
      },
    },

    scales: {
      y: {
        beginAtZero: true,

        ticks: {
          color: 'rgba(255,255,255,0.7)',
        },

        grid: {
          color: 'rgba(255,255,255,0.08)',
        },
      },

      x: {
        ticks: {
          color: 'rgba(255,255,255,0.7)',
          maxRotation: 45,
          minRotation: 0,
        },

        grid: {
          color: 'rgba(255,255,255,0.06)',
        },
      },
    },
  };

  if (loading) {
    return (
      <div>
        <TlHero />

        <section style={{
          padding: '40px',
          color: 'white',
        }}>
          <p>Loading game timeline data...</p>
          <p style={{ color: 'rgba(255,255,255,0.55)' }}>
            Retrieving Steam game details and review statistics.
          </p>
        </section>
      </div>
    );
  }

  return (
    <div>
      <TlHero />

      <section style={{
        padding: '40px',
        color: 'white',
      }}>

        <h2 style={{
          color: 'white',
          fontSize: '28px',
          fontWeight: '700',
          marginBottom: '10px',
        }}>
          GAME TIMELINE
        </h2>

        <p style={{
          color: 'rgba(255,255,255,0.6)',
          marginBottom: '25px',
        }}>
          Explore how Steam review statistics compare across game releases.
        </p>

        <div style={{
          marginBottom: '25px',
        }}>
          <select
            value={selectedProperty}
            onChange={(e) => setSelectedProperty(e.target.value)}
            style={{
              padding: '12px 16px',
              fontSize: '15px',
              borderRadius: '10px',
              background: 'rgba(25,30,55,0.8)',
              color: 'white',
              border: '1px solid rgba(255,255,255,0.2)',
              backdropFilter: 'blur(12px)',
              cursor: 'pointer',
            }}
          >
            {properties.map(p => (
              <option
                key={p.value}
                value={p.value}
                style={{
                  backgroundColor: '#171b2e',
                  color: 'white',
                }}
              >
                {p.label}
              </option>
            ))}
          </select>
        </div>

        <div style={{
          display: 'flex',
          gap: '18px',
          flexWrap: 'wrap',
          marginBottom: '25px',
        }}>
          {games.map(game => (
            <div
              key={game.name}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 12px',
                borderRadius: '20px',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.09)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: game.color,
                boxShadow: `0 0 10px ${game.color}`,
              }} />

              <span style={{
                color: 'rgba(255,255,255,0.85)',
                fontSize: '13px',
              }}>
                {game.name}
              </span>
            </div>
          ))}
        </div>

        {games.length > 0 ? (
          <>
            <div style={{
              position: 'relative',
              padding: '25px',
              minHeight: '430px',
              borderRadius: '20px',
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
              boxShadow: '0 0 35px rgba(105,75,190,0.15)',
            }}>
              <div style={{
                height: '380px',
                position: 'relative',
              }}>
                <Line data={chartData} options={options} />
              </div>
            </div>

            {failedGames.length > 0 && (
              <p style={{
                marginTop: '18px',
                color: 'rgba(255,255,255,0.55)',
                fontSize: '13px',
              }}>
                Some games could not be loaded: {failedGames.join(', ')}.
              </p>
            )}
          </>
        ) : (
          <div style={{
            padding: '30px',
            borderRadius: '16px',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.12)',
            backdropFilter: 'blur(15px)',
          }}>
            <h3>Unable to retrieve game statistics</h3>

            <p style={{
              color: 'rgba(255,255,255,0.65)',
            }}>
              Steam did not return usable statistics for the selected games.
              Check the browser console for the individual request errors.
            </p>

            {failedGames.length > 0 && (
              <p style={{
                color: '#F0B53B',
                fontSize: '14px',
              }}>
                Failed games: {failedGames.join(', ')}
              </p>
            )}
          </div>
        )}

      </section>
    </div>
  );
}

export default Timeline;

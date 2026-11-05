import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import axios from 'axios';

import CompHero from '../Components/CpHero';
import CpCards from '../Components/CpCards';
import CpGameSel from '../Components/CpGameSel';
import PieChart from '../Components/PieChart';
import BarChart from '../Components/BarChart';
import ScatterPlot from '../Components/ScatterPlot';

const PROXY = 'https://proxy.corsfix.com/?';

const GAMES = [
  { id: 1245620, name: 'Elden Ring' },
  { id: 2622380, name: 'Elden Ring Nightreign' },
  { id: 2531310, name: 'The Last of Us Part II' },
  { id: 1237970, name: 'Titanfall 2' },
  { id: 1796470, name: 'Haste' },
  { id: 367520, name: 'Hollow Knight' },
  { id: 1030300, name: 'Hollow Knight Silksong' },
  { id: 632360, name: 'Risk of Rain 2' },
  { id: 1904480, name: 'Absolum' },
  { id: 1229490, name: 'ULTRAKILL' },
  { id: 2610650, name: "Don't Stop Girlypop" },
  { id: 730, name: 'CS2' },
  { id: 3527290, name: 'Peak' },
  { id: 440, name: 'Team Fortress 2' },
  { id: 1091500, name: 'Cyberpunk 2077' },
  { id: 1172470, name: 'Apex Legends' },
  { id: 271590, name: 'GTA V' },
  { id: 1145350, name: 'Hades II' },
  { id: 1623730, name: 'Palworld' },
  { id: 2379780, name: 'Balatro' },
  { id: 1144200, name: 'Ready or Not' },
  { id: 1086940, name: "Baldur's Gate 3" },
  { id: 1817190, name: 'Spider-Man: Miles Morales' },
  { id: 3108510, name: 'FlyKnight' },
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

  try {
    const response = await axios.get(proxyUrl);

    console.log(`Steam reviews for ${appId}:`, response.data);

    return response.data?.response?.query_summary ?? null;
  } catch (error) {
    console.warn(`Review data unavailable for ${appId}:`, {
      status: error.response?.status,
      response: error.response?.data,
      message: error.message,
    });

    // Keep the game usable even if reviews cannot be retrieved.
    return null;
  }
}

async function fetchGameById(appId) {
  const detailsResponse = await axios.get(
    `${PROXY}https://store.steampowered.com/api/appdetails?appids=${appId}&cc=us`
  );

  const appDetails = detailsResponse.data?.[appId];

  if (!appDetails?.success || !appDetails?.data) {
    throw new Error(`Steam could not return details for game ${appId}`);
  }

  const reviews = await fetchSteamReviews(appId);

  return {
    details: appDetails.data,
    reviews,
  };
}

function glassPanel(extraStyles = {}) {
  return {
    background: `
      linear-gradient(
        135deg,
        rgba(105,75,190,0.15),
        rgba(30,130,190,0.10)
      ),
      rgba(15,20,38,0.68)
    `,
    backdropFilter: 'blur(18px)',
    WebkitBackdropFilter: 'blur(18px)',
    border: '1px solid rgba(255,255,255,0.13)',
    borderRadius: '18px',
    boxShadow: '0 0 30px rgba(105,75,190,0.13)',
    ...extraStyles,
  };
}

function sectionHeading() {
  return {
    color: 'white',
    fontSize: '1.15rem',
    fontWeight: '700',
    letterSpacing: '1px',
    marginBottom: '20px',
  };
}

function Comparison() {
  const [game1, setGame1] = useState(null);
  const [game2, setGame2] = useState(null);
  const [randomizing, setRandomizing] = useState(false);
  const [randomizeError, setRandomizeError] = useState('');

  const handleRandomize = async () => {
    try {
      setRandomizing(true);
      setRandomizeError('');

      const shuffled = [...GAMES].sort(() => Math.random() - 0.5);

      const pick1 = shuffled[0];
      const pick2 = shuffled[1];

      console.log('Randomly selected games:', pick1.name, pick2.name);

      const [result1, result2] = await Promise.all([
        fetchGameById(pick1.id),
        fetchGameById(pick2.id),
      ]);

      setGame1(result1);
      setGame2(result2);

      if (!result1.reviews || !result2.reviews) {
        setRandomizeError(
          'Games loaded, but review data was unavailable for one or both games.'
        );
      }
    } catch (error) {
      console.error('Randomize error:', {
        status: error.response?.status,
        response: error.response?.data,
        message: error.message,
      });

      setRandomizeError(
        'Unable to load the selected games. Please try again.'
      );
    } finally {
      setRandomizing(false);
    }
  };

  return (
    <div style={{ color: 'white' }}>
      <CompHero />

      <main style={{
        padding: '35px 4%',
        maxWidth: '1500px',
        margin: '0 auto',
      }}>

        {/* GAME SELECTION */}
        <section style={glassPanel({ padding: '28px', marginBottom: '35px' })}>
          <h2 style={sectionHeading()}>
            GAME SELECTION
          </h2>

          <p style={{
            color: 'rgba(255,255,255,0.6)',
            marginBottom: '25px',
          }}>
            Select two different games to compare their Steam statistics.
          </p>

          <div className="row align-items-start">
            <div className="col-lg-5 col-md-5 mb-4">
              <CpGameSel onSelectGame={setGame1} />
              <div style={{ marginTop: '20px' }}>
                <CpCards game={game1} />
              </div>
            </div>

            <div className="col-lg-2 col-md-2 text-center d-flex flex-column align-items-center justify-content-center">
              <h2 style={{
                color: '#F0B53B',
                fontSize: '2.5rem',
                fontWeight: '800',
                textShadow: '0 0 20px rgba(240,181,59,0.35)',
                margin: '15px 0',
              }}>
                VS
              </h2>

              <button
                onClick={handleRandomize}
                disabled={randomizing}
                style={{
                  background: randomizing
                    ? 'rgba(255,255,255,0.15)'
                    : 'linear-gradient(135deg, #7556C8, #327EBB)',
                  color: 'white',
                  border: '1px solid rgba(255,255,255,0.2)',
                  padding: '11px 20px',
                  borderRadius: '10px',
                  cursor: randomizing ? 'not-allowed' : 'pointer',
                  boxShadow: '0 0 22px rgba(117,86,200,0.3)',
                  transition: '0.2s ease',
                  whiteSpace: 'nowrap',
                }}
              >
                {randomizing ? 'Loading...' : 'Randomize'}
              </button>

              {randomizeError && (
                <p style={{
                  color: '#F0B53B',
                  fontSize: '12px',
                  marginTop: '12px',
                }}>
                  {randomizeError}
                </p>
              )}
            </div>

            <div className="col-lg-5 col-md-5 mb-4">
              <CpGameSel onSelectGame={setGame2} />
              <div style={{ marginTop: '20px' }}>
                <CpCards game={game2} />
              </div>
            </div>
          </div>
        </section>

        {/* GRAPHICAL INFORMATION */}
        <section style={glassPanel({ padding: '28px', marginBottom: '35px' })}>
          <h2 style={sectionHeading()}>
            GRAPHICAL INFORMATION
          </h2>

          {/* PIE CHARTS */}
          <div style={{ marginBottom: '35px' }}>
            <h3 style={{
              color: 'rgba(255,255,255,0.8)',
              fontSize: '1rem',
              marginBottom: '20px',
            }}>
              REVIEW BREAKDOWN
            </h3>

            <div className="row justify-content-center">
              <div className="col-md-6 d-flex justify-content-center mb-3">
                <PieChart game={game1} />
              </div>

              <div className="col-md-6 d-flex justify-content-center mb-3">
                <PieChart game={game2} />
              </div>
            </div>
          </div>

          {/* BAR CHART AND SCATTER PLOT */}
          <div className="row">
            <div className="col-lg-6 mb-4">
              <h3 style={{
                color: 'rgba(255,255,255,0.8)',
                fontSize: '1rem',
                marginBottom: '18px',
              }}>
                REVIEW SENTIMENT COMPARISON
              </h3>

              <BarChart game1={game1} game2={game2} />
            </div>

            <div className="col-lg-6 mb-4">
              <h3 style={{
                color: 'rgba(255,255,255,0.8)',
                fontSize: '1rem',
                marginBottom: '18px',
              }}>
                PRICE VS REVIEW SCORE
              </h3>

              <ScatterPlot game1={game1} game2={game2} />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Comparison;

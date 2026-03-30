import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import axios from 'axios';
import CompHero from '../Components/CpHero';
import CpCards from '../Components/CpCards';
import CpGameSel from '../Components/CpGameSel';
import PieChart from '../Components/PieChart';
import BarChart from '../Components/BarChart';
import ScatterPlot from '../Components/ScatterPlot';


const GAMES = [
  { id: 1245620,  name: "Elden Ring" },
  { id: 2622380,  name: "Elden Ring Nightreign" },
  { id: 2531310,  name: "The Last of Us Part II" },
  { id: 1237970,  name: "Titanfall 2" },
  { id: 1796470,  name: "Haste" },
  { id: 367520,   name: "Hollow Knight" },
  { id: 1030300,  name: "Hollow Knight Silksong" },
  { id: 632360,   name: "Risk of Rain 2" },
  { id: 1904480,  name: "Absolum" },
  { id: 1229490,  name: "ULTRAKILL" },
  { id: 2610650,  name: "Don't Stop Girlypop" },
  { id: 730,      name: "CS2" },
  { id: 3527290,  name: "Peak" },
  { id: 440,      name: "Team Fortress 2" },
  { id: 1091500,  name: "Cyberpunk 2077" },
  { id: 1172470,  name: "Apex Legends" },
  { id: 271590,   name: "GTA V" },
  { id: 1145350,  name: "Hades II" },
  { id: 1623730,  name: "Palworld" },
  { id: 2379780,  name: "Balatro" },
  { id: 1144200,  name: "Ready or Not" },
  { id: 1086940,  name: "Baldurs Gate 3" },
  { id: 1817190,  name: "SpiderMan Miles Morales" },
  { id: 3108510,  name: "FlyKnight" },
];

const PROXY = "https://proxy.corsfix.com/?";

async function fetchGameById(appId) {
  const [detailsResponse, reviewsResponse] = await Promise.all([
    axios.get(`${PROXY}https://store.steampowered.com/api/appdetails?appids=${appId}&cc=us`),
    axios.get(`${PROXY}https://store.steampowered.com/appreviews/${appId}?json=1`),
  ]);
  return {
    details: detailsResponse.data[appId].data,
    reviews: reviewsResponse.data.query_summary,
  };
}

function Comparison() {

  const [game1, setGame1] = useState(null);
  const [game2, setGame2] = useState(null);
  const [randomizing, setRandomizing] = useState(false);

  const handleRandomize = async () => {
    try {
      setRandomizing(true);


      const shuffled = [...GAMES].sort(() => Math.random() - 0.5);
      const pick1 = shuffled[0];
      const pick2 = shuffled[1];

     
      const [result1, result2] = await Promise.all([
        fetchGameById(pick1.id),
        fetchGameById(pick2.id),
      ]);

      setGame1(result1);
      setGame2(result2);
    } catch (error) {
      console.error('Randomize error:', error);
    } finally {
      setRandomizing(false);
    }
  };

  return (
    <div>

      <CompHero />

      <section>
        <div className='GameComps'>

          <div className='row mb-4'>
            <div className='col'>
              <h1 style={{
                color: '#1B2C44',
                backgroundColor: '#F0B53B',
                width: "fit-content",
                borderRadius: "20px",
                padding: "8px 20px",
                fontSize: "1.2rem"
              }}>
                GAME SELECTION <br />
                PLEASE SELECT 2 DIFFERENT GAMES IN EACH DROP DOWN
              </h1>
            </div>
          </div>

          <div className='row align-items-start'>

            {/* Game 1 */}
            <div className='col-5' style={{ borderRadius: '10px', padding: '20px' }}>
              <CpGameSel onSelectGame={setGame1} />
              <CpCards game={game1} />
            </div>

            {/* VS + Randomize but */}
            <div className='col-2 text-center' style={{ paddingTop: '100px' }}>
              <h1 style={{ color: 'white', fontSize: '3rem' }}>VS</h1>
              <button
                onClick={handleRandomize}
                disabled={randomizing}
                style={{
                  backgroundColor: randomizing ? '#888' : '#4CAF50',
                  color: 'white',
                  border: 'none',
                  padding: '8px 20px',
                  borderRadius: '5px',
                  marginTop: '10px',
                  cursor: randomizing ? 'not-allowed' : 'pointer',
                  transition: 'background-color 0.2s',
                }}
              >
                {randomizing ? 'Loading...' : 'Randomize'}
              </button>
            </div>

            {/* Game 2 */}
            <div className='col-5' style={{ borderRadius: '10px', padding: '20px' }}>
              <CpGameSel onSelectGame={setGame2} />
              <CpCards game={game2} />
            </div>

          </div>

        </div>
      </section>

      {/* Graphical Info */}
      <section>
        <div className='PieSec'>

          <h2 style={{ backgroundColor: '#F0B53B', color: '#1B2C44', padding: '10px 20px', width: 'fit-content' }}>
            GRAPHICAL INFO
          </h2>

          {/* Pie Charts */}
          <div className='mt-3'>
            <h3 style={{ backgroundColor: '#F0B53B', color: '#1B2C44', padding: '8px 20px', width: 'fit-content' }}>
              PIE CHART
            </h3>
            <div className='row mt-3'>
              <div className='col-6 text-center'>
                <PieChart game={game1} style={{ width: "60%" }} />
              </div>
              <div className='col-6 text-center'>
                <PieChart game={game2} style={{ width: "60%" }} />
              </div>
            </div>
          </div>

        </div>

        {/* Bar Graph and Scatter Plot */}
        <div className='row mt-5 OtherSec'>
          <div className='col-6'>
            <h3 style={{ backgroundColor: '#F0B53B', color: '#1B2C44', padding: '8px 20px', width: 'fit-content' }}>
              BAR GRAPH
            </h3>
            <BarChart game1={game1} game2={game2} />
          </div>
          <div className='col-6'>
            <h3 style={{ backgroundColor: '#F0B53B', color: '#1B2C44', padding: '8px 20px', width: 'fit-content' }}>
              SCATTER PLOT
            </h3>
            <ScatterPlot game1={game1} game2={game2} />
          </div>
        </div>

      </section>

    </div>
  );
}

export default Comparison;
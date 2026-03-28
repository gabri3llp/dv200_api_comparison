import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import CompHero from '../Components/CpHero';
import CpCards from '../Components/CpCards';
import CpGameSel from '../Components/CpGameSel';

function Comparison(){

  // State for both games - just like rocket1 and rocket2 in class!
  const [game1, setGame1] = useState(null);
  const [game2, setGame2] = useState(null);

  return(
    <div>

      <CompHero></CompHero>

      <section>
        <div className='GameComps'>

          {/* Header */}
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
                GAME SELECTION <br/>
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

            {/* VS */}
            <div className='col-2 text-center' style={{ paddingTop: '100px' }}>
              <h1 style={{ color: 'white', fontSize: '3rem' }}>VS</h1>
              <button style={{ 
                backgroundColor: '#4CAF50', 
                color: 'white', 
                border: 'none', 
                padding: '8px 20px', 
                borderRadius: '5px',
                marginTop: '10px'
              }}>
                Randomize
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

      <section>
        <div className='PieSec'>

          <h2 style={{ backgroundColor: '#F0B53B', color: '#1B2C44', padding: '10px 20px', width: 'fit-content' }}>
            GRAPHICAL INFO
          </h2>

          <div className='mt-3'>
            <h3 style={{ backgroundColor: '#F0B53B', color: '#1B2C44', padding: '8px 20px', width: 'fit-content' }}>
              PIE CHART
            </h3>
            <div className='row mt-3'>
              <div className='col-6 text-center'>
                <p style={{ color: 'white' }}>Graph here</p>
              </div>
              <div className='col-6 text-center'>
                <p style={{ color: 'white' }}>Graph here</p>
              </div>
            </div>
          </div>

        </div>

        <div className='row mt-5 OtherSec'>
          <div className='col-6'>
            <h3 style={{ backgroundColor: '#F0B53B', color: '#1B2C44', padding: '8px 20px', width: 'fit-content' }}>
              BAR GRAPH
            </h3>
            <p style={{ color: 'white' }}>Graph here</p>
          </div>
          <div className='col-6'>
            <h3 style={{ backgroundColor: '#F0B53B', color: '#1B2C44', padding: '8px 20px', width: 'fit-content' }}>
              SCATTER PLOT
            </h3>
            <p style={{ color: 'white' }}>Graph here</p>
          </div>
        </div>

      </section>

    </div>
  )
}

export default Comparison;
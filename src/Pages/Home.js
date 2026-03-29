import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import MyCards from '../Components/HpCards';
import HomeHero from '../Components/HpHero';
import Mydata from '../Components/HpData';

const TOP_GAMES = [
  { id: 1245620, name: "Elden Ring" },
  { id: 1086940, name: "Baldurs Gate 3" },
  { id: 2379780, name: "Balatro" },
  { id: 632360,  name: "Risk of Rain 2" },
];

function Home() {

  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllGames = async () => {
      try {
        const PROXY = "https://proxy.corsfix.com/?";

        const results = await Promise.all(
          TOP_GAMES.map(async (game) => {
            const detailsResponse = await axios.get(
              `${PROXY}https://store.steampowered.com/api/appdetails?appids=${game.id}&cc=us`
            );
            const reviewsResponse = await axios.get(
              `${PROXY}https://store.steampowered.com/appreviews/${game.id}?json=1`
            );

            return {
              details: detailsResponse.data[game.id].data,
              reviews: reviewsResponse.data.query_summary
            };
          })
        );

        console.log('Home games:', results);
        setGames(results);
        setLoading(false);

      } catch (error) {
        console.error('Error fetching games:', error);
        setLoading(false);
      }
    };

    fetchAllGames();
  }, []);

  return (
    <div>

      <HomeHero></HomeHero>

      <div className='HpCardSectionC'>

        <div className='row'>
          <div className='col'>
            <h1 style={{ 
              color: '#1B2C44', 
              backgroundColor: '#F0B53B', 
              width: "fit-content", 
              borderRadius: "20px",
              padding: "8px 75px"
            }}>
              Top of their Games
            </h1>
          </div>
        </div>

        <div className='row HpCardSectionP'>
          <div className='col'>
            <MyCards game={games[0]} />
          </div>
          <div className='col'>
            <MyCards game={games[1]} />
          </div>
          <div className='col'>
            <MyCards game={games[2]} />
          </div>
          <div className='col'>
            <MyCards game={games[3]} />
          </div>
        </div>

      </div>

      <section className='DataSection'>
        <Mydata game={games[0]} />
      </section>

    </div>
  );
}

export default Home;
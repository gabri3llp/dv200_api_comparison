
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

import MyCards from '../Components/HpCards';
import HomeHero from '../Components/HpHero';
import Mydata from '../Components/HpData';

const TOP_GAMES = [
  { id: 1245620, name: "Elden Ring" },
  { id: 1086940, name: "Baldur's Gate 3" },
  { id: 2379780, name: "Balatro" },
  { id: 632360, name: "Risk of Rain 2" },
];

function Home() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAllGames = async () => {
      const PROXY = 'https://proxy.corsfix.com/?';

      try {
        const results = await Promise.all(
          TOP_GAMES.map(async (game) => {
            // Fetch Steam game details
            const detailsResponse = await axios.get(
              `${PROXY}https://store.steampowered.com/api/appdetails?appids=${game.id}&cc=us`
            );

            const details = detailsResponse.data?.[game.id]?.data;

            if (!details) {
              throw new Error(`Could not retrieve details for ${game.name}`);
            }

            // Prepare the newer Steam reviews API request
            const input = {
              appid: Number(game.id),
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

            let reviews = null;

            // Reviews are optional: game details can still load without them
            try {
              const reviewsResponse = await axios.get(
                `${PROXY}${steamUrl}`
              );

              reviews =
                reviewsResponse.data?.response?.query_summary ?? null;
            } catch (reviewError) {
              console.error(
                `Could not fetch reviews for ${game.name}:`,
                reviewError
              );
            }

            return {
              details,
              reviews,
            };
          })
        );

        console.log('Home games:', results);
        setGames(results);
      } catch (fetchError) {
        console.error('Error fetching games:', fetchError);
        setError('Unable to load the featured games. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAllGames();
  }, []);

  return (
    <div className="home-page">

      <HomeHero />

      <div className="HpCardSectionC">

        <div className="row">
          <div className="col">
            <h1
              style={{
                color: '#1B2C44',
                backgroundColor: '#F0B53B',
                width: 'fit-content',
                borderRadius: '20px',
                padding: '8px 75px',
              }}
            >
              Top of their Games
            </h1>
          </div>
        </div>

        {loading && (
          <p style={{ color: 'white', textAlign: 'center' }}>
            Loading featured games...
          </p>
        )}

        {error && (
          <p style={{ color: 'white', textAlign: 'center' }}>
            {error}
          </p>
        )}

        {!loading && !error && (
          <div className="row HpCardSectionP">
            {games.map((game, index) => (
              <div className="col" key={TOP_GAMES[index].id}>
                <MyCards game={game} />
              </div>
            ))}
          </div>
        )}

      </div>

      <section className="DataSection">
        <Mydata game={games[0]} />
      </section>

    </div>
  );
}

export default Home;


import { useState } from 'react';
import axios from 'axios';

const PROXY = 'https://proxy.corsfix.com/?';

const games = [
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
    languages: 'all',
    num_per_page: 20,
  };

  const steamUrl =
    `https://api.steampowered.com/IUserReviewsService/GetAppReviews/v1/?input_json=${encodeURIComponent(
      JSON.stringify(input)
    )}`;

  const proxyUrl = `${PROXY}${steamUrl}`;

  try {
    const response = await axios.get(proxyUrl);

    console.log('Steam review HTTP status:', response.status);
    console.log('Steam review response:', response.data);

    return response.data?.response?.query_summary ?? null;
  } catch (error) {
    console.error('STEAM REVIEWS REQUEST FAILED');
    console.error('Status:', error.response?.status);
    console.error('Response:', error.response?.data);
    console.error('Message:', error.message);
    console.error('Request URL:', error.config?.url);

    return null;
  }
}

function CpGameSel({ onSelectGame }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchGame = async (appId) => {
    try {
      setLoading(true);
      setError('');

      const detailsResponse = await axios.get(
        `${PROXY}https://store.steampowered.com/api/appdetails?appids=${appId}&cc=us`
      );

      const appDetails = detailsResponse.data?.[appId];

      if (!appDetails?.success || !appDetails?.data) {
        throw new Error('Steam did not return valid game details.');
      }

      const details = appDetails.data;

      // A review failure should not prevent the game from loading.
      const reviews = await fetchSteamReviews(appId);

      const game = {
        details,
        reviews,
      };

      console.log('COMPLETE GAME OBJECT:', game);

      onSelectGame?.(game);

      if (!reviews) {
        setError('Game loaded, but Steam review data is unavailable.');
      }

    } catch (error) {
      console.error('GAME DETAILS REQUEST FAILED');
      console.error('Status:', error.response?.status);
      console.error('Response:', error.response?.data);
      console.error('Message:', error.message);

      setError('Unable to load game details. Check the browser console.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const appId = e.target.value;

    if (!appId) {
      onSelectGame?.(null);
      setError('');
      return;
    }

    fetchGame(appId);
  };

  return (
    <div>
      <select
        onChange={handleChange}
        defaultValue=""
        style={{
          width: '100%',
          padding: '10px',
          fontSize: '16px',
        }}
      >
        <option value="">Select a game</option>

        {games.map((game) => (
          <option key={game.id} value={game.id}>
            {game.name}
          </option>
        ))}
      </select>

      {loading && (
        <p style={{ color: 'white' }}>Loading...</p>
      )}

      {error && (
        <p style={{ color: '#F0B53B' }}>{error}</p>
      )}
    </div>
  );
}

export default CpGameSel;

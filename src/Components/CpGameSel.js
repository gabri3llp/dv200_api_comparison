import { useState } from 'react';
import axios from 'axios';

function CpGameSel({ onSelectGame }) {

  const [loading, setLoading] = useState(false);

  const games = [
    { id: 1245620,  name: "Elden Ring" },
    { id: 2622380, name: "Elden Ring Nightreign" },
    { id: 2531310,   name: "The Last of Us Part II" }, 
    { id: 1237970,  name: "Titanfall 2" }, 
    { id: 1796470,  name: "Haste" }, 
    { id: 367520,   name: "Hollow Knight" },
    { id: 1030300,  name: "Hollow Knight Silksong" },
    { id: 632360,   name: "Risk of Rain 2" },
    { id: 1904480,  name: "Absolum" }, 
    { id: 1229490,  name: "ULTRAKILL" },
    { id: 2610650,  name: "Don't Stop Girlypop" },
    { id: 730,      name: "CS2" },
    { id: 3527290,      name: "Peak" }, 
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

  const fetchGame = async (appId) => {
    try {
      setLoading(true);

      const PROXY = "https://proxy.corsfix.com/?";

     const detailsResponse = await axios.get(
        `${PROXY}https://store.steampowered.com/api/appdetails?appids=${appId}&cc=us`
      );

      const reviewsResponse = await axios.get(
        `${PROXY}https://store.steampowered.com/appreviews/${appId}?json=1`
      );

      const details = detailsResponse.data[appId].data;
      const reviews = reviewsResponse.data.query_summary;

      console.log('Game Details:', details);
      console.log('Game Reviews:', reviews);

      const game = { details, reviews };

      if (onSelectGame) onSelectGame(game);

      setLoading(false);

    } catch (error) {
      console.error('Error fetching game:', error);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const appId = e.target.value;
    if (appId) fetchGame(appId);
  };

  return (
    <div>
      <select
        onChange={handleChange}
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "16px"
        }}
      >
        <option value="">Select a game</option>
        {games.map(game => (
          <option key={game.id} value={game.id}>
            {game.name}
          </option>
        ))}
      </select>

      {loading && <p style={{ color: 'white' }}>Loading...</p>}
    </div>
  );
}

export default CpGameSel;
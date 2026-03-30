import '../App.css';

function HomeHero() {
  return (
    <div className="hero-section" style={{ 
      backgroundImage: "url('/Hollow.png')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      marginBottom: "5%"
    }}>
      <h1>Steam Stats Explorer</h1>
      <p>Overview of games and player statistics from the Steam API — compare playtime, genres, and ratings.</p>
    </div>
  );
}

export default HomeHero;
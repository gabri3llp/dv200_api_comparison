
import '../App.css';

function HomeHero() {
  return (
    <div
      className="hero-section home-hero"
      style={{
        backgroundImage: "url('/Abo.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="hero-glass">
        <h1>Steam Stats Explorer</h1>
        <p>
          Explore, analyse and compare your favourite Steam games
          through their reviews, prices and release dates.
        </p>
      </div>
    </div>
  );
}

export default HomeHero;

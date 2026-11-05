import '../App.css';

function CompHero() {
  return (
    <div
      className="hero-section comparison-hero"
      style={{
        backgroundImage: "url('/Night.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="hero-glass">
        <h1>Comparison page</h1>
        <p>
          Compare Steam games against each other, from their reviews
          to their release dates.
        </p>
      </div>
    </div>
  );
}

export default CompHero;
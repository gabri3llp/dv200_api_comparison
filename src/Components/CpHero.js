import '../App.css';

function CompHero() {
  return (
    <div className="hero-section" style={{ 
      backgroundImage: "url('/Night.png')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}>
      <h1 style={{ color: 'white' }}>Comparison page</h1>
      <p style={{ color: 'white' }}>Compare many steam games against each other. From their reviews down to their release dates</p>
    </div>
  );
}

export default CompHero;
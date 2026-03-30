import '../App.css';


function TimeHero() {
  return (
    <div className="hero-section" style={{ 
      backgroundImage: "url('/Abo.png')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}>
      <h1 style={{alignItems: 'center',}}> The timeline page will show us 7 diffrent games in varisous diffrent data sets at their release dates </h1>
    </div>
  );
}

export default TimeHero;
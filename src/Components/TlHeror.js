
import '../App.css';

function TimeHero() {
  return (
    <div
      className="hero-section"
      style={{
        position: 'relative',
        minHeight: '380px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '50px 8%',
        backgroundImage: `
          linear-gradient(
            90deg,
            rgba(10,12,28,0.92),
            rgba(10,12,28,0.55),
            rgba(10,12,28,0.25)
          ),
          url('/Abo.png')
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div style={{
        maxWidth: '850px',
        padding: '30px 35px',
        borderRadius: '20px',
        background: 'rgba(15,20,38,0.48)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.16)',
        boxShadow: '0 0 35px rgba(105,75,190,0.2)',
      }}>
        <p style={{
          color: '#F0B53B',
          letterSpacing: '3px',
          fontSize: '13px',
          fontWeight: '700',
          marginBottom: '12px',
        }}>
          STEAM STATS EXPLORER
        </p>

        <h1 style={{
          color: 'white',
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: '800',
          marginBottom: '15px',
        }}>
          GAME TIMELINE
        </h1>

        <p style={{
          color: 'rgba(255,255,255,0.8)',
          fontSize: '16px',
          lineHeight: '1.7',
          margin: 0,
        }}>
          Explore seven different games and discover how their Steam
          statistics compare across their release dates.
        </p>
      </div>
    </div>
  );
}

export default TimeHero;

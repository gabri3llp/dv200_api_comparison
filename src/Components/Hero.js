import '../App.css';
import Image from 'react-bootstrap/Image';

function Hero() {
  return (
    <div className="hero-section">
      <Image src="holder.js/100px250" alt='COOL ASS IMAGE' fluid />
      <h1> Steam stats explorer </h1>
      <p>Overview of games and player statistics from the Steam2 API — compare playtime, genres, and ratings. More detail</p>
    </div>
  );
}

export default Hero;
import '../App.css';
import Image from 'react-bootstrap/Image';

function Hero() {
  return (
    <div className="hero-section">
      <Image src="holder.js/100px250" alt='COOL ASS IMAGE' fluid />
      <h1> Welcome to My App </h1>
      <p>Some cool subtitle here</p>
    </div>
  );
}

export default Hero;
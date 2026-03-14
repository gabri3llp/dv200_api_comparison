import '../App.css';
import Image from 'react-bootstrap/Image';

function CompHero() {
  return (
    <div className="hero-section">
      <Image src="holder.js/100px250" alt='COOL ASS IMAGE' fluid />
      <h1> Comparison page </h1>
      <p>Compare many steam games against each other. From their reviews down to their release dates</p>
    </div>
  );
}

export default CompHero;
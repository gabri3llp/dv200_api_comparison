import '../App.css';
import Image from 'react-bootstrap/Image';

function TimeHero() {
  return (
    <div className="hero-section">
      <Image src="holder.js/100px250" alt='COOL ASS IMAGE' fluid />
      <h1> The timeline page will show us 5 different games in various different states, like release or total reviews </h1>
    </div>
  );
}

export default TimeHero;
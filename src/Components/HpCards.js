import '../App.css';
import Card from 'react-bootstrap/Card';

function MyCards({ game }) {

  if (!game) return <p style={{ color: 'white' }}>Loading...</p>;

  return (
    <section className='HpCards'>
      <Card style={{ width: '18rem', backgroundColor: '#1B2C44', color: 'white' }}>
        <Card.Img 
          variant="top" 
          src={game.details.header_image} 
          alt={game.details.name}
        />
        <Card.Body>
          <Card.Title>{game.details.name}</Card.Title>
          <Card.Subtitle className="mb-2" style={{ color: 'white' }}>
          {game.details.release_date.date}
          </Card.Subtitle>
          <Card.Text>
            Price: {game.details.price_overview?.final_formatted || 'Free'}<br/>
            Review: {game.reviews.review_score_desc}
          </Card.Text>
        </Card.Body>
      </Card>
    </section>
  );
}

export default MyCards;
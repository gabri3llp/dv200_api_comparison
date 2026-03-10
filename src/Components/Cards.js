import '../App.css';

import Card from 'react-bootstrap/Card';

function MyCards() {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>Game</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
        <Card.Text>
          Game info, eg Prce and name
        </Card.Text>
        <Card.Link href="#">Card Link</Card.Link>
        <Card.Link href="#">Another Link</Card.Link>
      </Card.Body>
    </Card>
  );
}

export default MyCards;
function CpCards({ game }) {

  if (!game) return <p style={{ color: 'white' }}>Select a game to see stats</p>;

  return (
    <div>
      <img
        src={game.details.header_image}
        alt={game.details.name}
        style={{ width: '100%', borderRadius: '8px', marginBottom: '15px' }}
      />

      <table style={{ width: '100%', color: 'white' }}>
        <tbody>
          <tr>
            <td><strong>Title:</strong></td>
            <td>{game.details.name}</td>
          </tr>
          <tr>
            <td><strong>Released:</strong></td>
            <td>{game.details.release_date.date}</td>
          </tr>
          <tr>
            <td><strong>Price:</strong></td>
            <td>{game.details.price_overview?.final_formatted || 'Free'}</td>
          </tr>
          <tr>
            <td><strong>Review Score:</strong></td>
            <td>{game.reviews.review_score}</td>
          </tr>
          <tr>
            <td><strong>Review Description:</strong></td>
            <td>{game.reviews.review_score_desc}</td>
          </tr>
          <tr>
            <td><strong>Total Positive:</strong></td>
            <td>{game.reviews.total_positive}</td>
          </tr>
          <tr>
            <td><strong>Total Negative:</strong></td>
            <td>{game.reviews.total_negative}</td>
          </tr>
          <tr>
            <td><strong>Total Reviews:</strong></td>
            <td>{game.reviews.total_reviews}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default CpCards;
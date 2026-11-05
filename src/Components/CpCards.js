
function CpCards({ game }) {
  if (!game) {
    return <p style={{ color: 'white' }}>Select a game to see stats</p>;
  }

  const details = game?.details ?? {};
  const reviews = game?.reviews?.query_summary
    ?? game?.reviews
    ?? {};

  return (
    <div>
      {details.header_image && (
        <img
          src={details.header_image}
          alt={details.name ?? 'Game'}
          style={{
            width: '100%',
            borderRadius: '8px',
            marginBottom: '15px'
          }}
        />
      )}

      <table style={{ width: '100%', color: 'white' }}>
        <tbody>
          <tr>
            <td><strong>Title:</strong></td>
            <td>{details.name ?? 'Unavailable'}</td>
          </tr>

          <tr>
            <td><strong>Released:</strong></td>
            <td>{details.release_date?.date ?? 'Unavailable'}</td>
          </tr>

          <tr>
            <td><strong>Price:</strong></td>
            <td>
              {details.price_overview?.final_formatted
                ?? (details.is_free ? 'Free' : 'Unavailable')}
            </td>
          </tr>

          <tr>
            <td><strong>Review Score:</strong></td>
            <td>{reviews.review_score ?? 'N/A'}</td>
          </tr>

          <tr>
            <td><strong>Review Description:</strong></td>
            <td>{reviews.review_score_desc ?? 'Unavailable'}</td>
          </tr>

          <tr>
            <td><strong>Total Positive:</strong></td>
            <td>{reviews.total_positive ?? 'N/A'}</td>
          </tr>

          <tr>
            <td><strong>Total Negative:</strong></td>
            <td>{reviews.total_negative ?? 'N/A'}</td>
          </tr>

          <tr>
            <td><strong>Total Reviews:</strong></td>
            <td>{reviews.total_reviews ?? 'N/A'}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default CpCards;

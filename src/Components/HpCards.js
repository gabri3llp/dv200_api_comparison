
function MyCards({ game }) {
  // Support both the Steam API response and extracted game data.
  const details = game?.details ?? game?.data ?? game;
  const reviews = game?.reviews?.query_summary ?? game?.reviews ?? {};

  const title = details?.name ?? "Unknown game";

  const metacriticScore = details?.metacritic?.score ?? "N/A";

  const price =
    details?.price_overview?.final_formatted ??
    (details?.is_free ? "Free" : "Price unavailable");

  const reviewDescription =
    reviews?.review_score_desc ?? "Review information unavailable";

  const positiveReviews = reviews?.total_positive ?? 0;
  const negativeReviews = reviews?.total_negative ?? 0;
  const totalReviews = reviews?.total_reviews ?? 0;

  return (
    <div className="game-card">
      <h2>{title}</h2>

      <img
        src={details?.header_image ?? ""}
        alt={title}
      />

      <p>Metacritic Score: {metacriticScore}</p>
      <p>Price: {price}</p>

      <p>Steam Review Rating: {reviewDescription}</p>
      <p>Positive Reviews: {positiveReviews}</p>
      <p>Negative Reviews: {negativeReviews}</p>
      <p>Total Reviews: {totalReviews}</p>
    </div>
  );
}

export default MyCards;


import '../App.css';

function Mydata() {
  return (
    <div className="row DataSection">

      <div className="col-12">
        <h1>What will we cover on this application?</h1>

        <h3>
          In this API, I will be using the following data to compare my games:
        </h3>
      </div>

      <div className="col-md-6">
        <div className="data-list">
          <h4>Game Title</h4>
          <h4>Release Date</h4>
          <h4>Price</h4>
          <h4>Steam Review Score</h4>
          <h4>Review Description</h4>
          <h4>Total Positive Reviews</h4>
          <h4>Total Negative Reviews</h4>
          <h4>Total Number of Reviews</h4>
        </div>
      </div>

      <div className="col-md-6">
        <img
          src="/peak.png"
          alt="Steam game artwork"
          style={{
            width: '100%',
            borderRadius: '14px',
            padding: '10px',
          }}
        />
      </div>

    </div>
  );
}

export default Mydata;

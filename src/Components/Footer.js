import "../App.css";
import { Link } from "react-router-dom";

function Footsies() {
  return (
    <div className="footer">
      <div className="container">
        <div className="row">

          <div className="col">
            <h5>Pages</h5>
            <Link to="/"> Home </Link><br/>
            <Link to="/Comparison">Comparison</Link><br/>
            <Link to="/Timeline">Timeline</Link>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Footsies;
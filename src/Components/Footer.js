import "../App.css";
import { Link } from "react-router-dom";

function Footsies() {
  return (
    <div className="footer">
      <div className="container-fluid d-flex align-items-center py-3">

        {/* Logo on the left */}
        <div className="footer-logo me-auto">
          <Link to="/">
            <img src="/Favicon.png" alt="logo" height="45" />
          </Link>
        </div>

        {/* Links in the middle */}
        <div className="footer-links d-flex gap-4">
          <Link to="/">Home</Link>
          <Link to="/Comparison">Comparison</Link>
          <Link to="/Timeline">Timeline</Link>
        </div>

      </div>
    </div>
  );
}

export default Footsies;
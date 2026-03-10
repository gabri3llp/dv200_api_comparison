import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';


import '../App.css';

function MyNavBar() {
  return (
    <Navbar  expand="lg" className="bg-body-tertiary MyNavBar">
      <Container>
        <Navbar.Brand as={Link} to="/"> React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" >Home</Nav.Link>
            <Nav.Link as={Link} to="/Comparison">Comparison</Nav.Link>
            <Nav.Link as={Link} to="/Timeline">Timeline</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavBar;
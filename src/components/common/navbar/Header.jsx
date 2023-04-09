import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

const Header = () => {
    return (
      <Navbar bg="none" expand="lg">
         <Container>
            <Navbar.Brand as={Link} to="/about">PPTX converter</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
               <Nav className="me-auto">
                  <Nav.Link as={Link} to="/about" className="text-dark">About</Nav.Link>
                  <Nav.Link as={Link} to="/text-to-pptx" className="text-dark">Text2pptx</Nav.Link>
                  <Nav.Link as={Link} to="/audio-to-pptx" className="text-dark">Audio2pptx</Nav.Link>
                  <Nav.Link as={Link} to="/video-to-pptx" className="text-dark">Video2pptx</Nav.Link>
               </Nav>
            </Navbar.Collapse>
         </Container>
      </Navbar>
    )
}
export default Header
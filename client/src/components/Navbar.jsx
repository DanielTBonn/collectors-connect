import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  Nav,
  Container,
  Modal,
  Tab,
} from "react-bootstrap";
import { AiOutlineHome, AiOutlineUser, AiOutlineLogin, AiOutlineLogout, AiOutlineSearch } from "react-icons/ai";
import SignUpForm from "./SignupForm";
import LoginForm from "./LoginForm";

import Auth from "../utils/auth";

const styles = {
  iconLink: {
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  
  iconLinkHover: {
    transform: "translateY(-5px)", /* Move up by 5 pixels on hover */
  }
}

const AppNavbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);
  // set hover display state
  const [isHoveredHome, setIsHoveredHome] = useState(false);
  const [isHoveredUser, setIsHoveredUser] = useState(false);
  const [isHoveredOut, setIsHoveredOut] = useState(false);
  const [isHoveredSearch, setIsHoveredSearch] = useState(false);
  const [isHoveredIn, setIsHoveredIn] = useState(false);

  return (
    <>
      <Navbar expand="lg" style={{backgroundColor: "rgba(255, 250, 255, 0.771)", marginLeft: "-150px", paddingLeft: "150px", borderRadius: "0 10px 10px 0" }}>
        <Container fluid>
          <Navbar.Brand as={Link} to="/" >Collectors Connect</Navbar.Brand>
            <Nav className="ml-auto" style={{ flexDirection: 'row', }}>
              <Nav.Link as={Link} to="/" style={isHoveredHome ? { ...styles.iconLink, ...styles.iconLinkHover } : styles.iconLink}
      onMouseEnter={() => setIsHoveredHome(true)}
      onMouseLeave={() => setIsHoveredHome(false)}>
                <AiOutlineHome />
              </Nav.Link>
              {/* if user is logged in show saved books and logout */}
              {Auth.loggedIn() ? (
                <>
                  <Nav.Link as={Link} to="/me" style={isHoveredUser ? { ...styles.iconLink, ...styles.iconLinkHover } : styles.iconLink}
      onMouseEnter={() => setIsHoveredUser(true)}
      onMouseLeave={() => setIsHoveredUser(false)}>
                   <AiOutlineUser />
                  </Nav.Link>
                  <Nav.Link onClick={Auth.logout} style={isHoveredOut ? { ...styles.iconLink, ...styles.iconLinkHover } : styles.iconLink}
      onMouseEnter={() => setIsHoveredOut(true)}
      onMouseLeave={() => setIsHoveredOut(false)}><AiOutlineLogout /></Nav.Link>
                  <Nav.Link as={Link} to="/search" style={isHoveredSearch ? { ...styles.iconLink, ...styles.iconLinkHover } : styles.iconLink}
      onMouseEnter={() => setIsHoveredSearch(true)}
      onMouseLeave={() => setIsHoveredSearch(false)}>
                  <AiOutlineSearch />
                  </Nav.Link>
                </>
              ) : (
                <Nav.Link onClick={() => setShowModal(true)} style={isHoveredIn ? { ...styles.iconLink, ...styles.iconLinkHover } : styles.iconLink}
                onMouseEnter={() => setIsHoveredIn(true)}
                onMouseLeave={() => setIsHoveredIn(false)}>
                  <AiOutlineLogin />
                </Nav.Link>
              )}
            </Nav>
          {/* </Navbar.Collapse> */}
        </Container>
      </Navbar>

      {/* set modal data up */}
      <Modal
        size="lg"
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby="signup-modal"
      >
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey="login">
          <Modal.Header closeButton>
            <Modal.Title id="signup-modal">
              <Nav variant="pills">
                <Nav.Item>
                  <Nav.Link eventKey="login">Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="signup">Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey="login">
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey="signup">
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
};

export default AppNavbar;

import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Modal,
  Tab,
} from "react-bootstrap";
import { AiOutlineHome, AiOutlineUser, AiOutlineLogin, AiOutlineLogout, AiOutlineSearch } from "react-icons/ai";
import SignUpForm from "./SignupForm";
import LoginForm from "./LoginForm";

import Auth from "../utils/auth";

const AppNavbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Navbar expand="lg">
        <Container fluid>
          <Navbar.Brand as={Link} to="/">Collectors Connect</Navbar.Brand>
            <Nav className="ml-auto" style={{ flexDirection: 'row' }}>
              <Nav.Link as={Link} to="/">
                <AiOutlineHome />
              </Nav.Link>
              {/* if user is logged in show saved books and logout */}
              {Auth.loggedIn() ? (
                <>
                  <Nav.Link as={Link} to="/me">
                   <AiOutlineUser />
                  </Nav.Link>
                  <Nav.Link onClick={Auth.logout}><AiOutlineLogout /></Nav.Link>
                  <Nav.Link as={Link} to="/search">
                  <AiOutlineSearch />
                  </Nav.Link>
                </>
              ) : (
                <Nav.Link onClick={() => setShowModal(true)}>
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

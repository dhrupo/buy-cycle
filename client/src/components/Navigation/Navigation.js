import React, { useContext } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import "./Navigation.css";

const Navigation = () => {
  const [user, setUser] = useContext(UserContext);
  return (
    <Navbar bg="light" variant="light" expand="lg">
      <Link to="/"><Navbar.Brand>Buy Cycle</Navbar.Brand></Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="my-nav">
        <Nav className="ml-auto">
          <Link to="/home" className="nav-link">Home</Link>
          <Link to="/orders" className="nav-link">Orders</Link>
          <Link to="/admin" className="nav-link">Admin</Link>
          {
            user.isSignedIn ?
              <Link className="nav-link" onClick={() => setUser({})} to="/">{user.email || user.displayName}</Link>
              : <React.Fragment>
                <Link className="nav-link" to="/login">Login</Link>
                <Link className="nav-link" to="/registration">Registration</Link>
              </React.Fragment>
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
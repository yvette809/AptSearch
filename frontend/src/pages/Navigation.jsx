import React, { useState } from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

const Navigation = () => {
  const [nav, setNav] = useState(false);

  function fixNav() {
    if (window.scrollY >= 80) {
      setNav(true);
    } else {
      setNav(false);
    }
  }
  window.addEventListener("scroll", fixNav);

  return (
    <Navbar
      id="nav"
      expand="lg"
      className={nav ? "navigation active" : "navigation"}
    >
      <Link to="/" className="nav">
        <p>
          <span>A</span>ppt<span>S</span>earc<span>h</span>
        </p>
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/houses" className="nav-link">
            Houses
          </Link>
          <Link to="/about-us" className="nav-link">
            About-us
          </Link>

          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;

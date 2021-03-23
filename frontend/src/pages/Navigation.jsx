import React, { useState } from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../actions/auth";
import { Link } from "react-router-dom";

const Navigation = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    history.push("/");
  };

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
    // <Navbar
    //   id="nav"
    //   expand="lg"
    //   className={nav ? "navigation active" : "navigation"}
    // >
    //   <Link to="/" className="nav">
    //     <p>
    //       <span>A</span>ppt<span>S</span>earc<span>h</span>
    //     </p>
    //   </Link>
    //   <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //   <Navbar.Collapse id="basic-navbar-nav">
    //     <Nav className="ml-auto">
    //       <Link to="/" className="nav-link">
    //         Home
    //       </Link>
    //       <Link to="/houses" className="nav-link">
    //         Houses
    //       </Link>
    //       <Link to="/about-us" className="nav-link">
    //         About-us
    //       </Link>
    //       <Link to="/register" className="nav-link">
    //         Register
    //       </Link>
    //       <Link to="/login" className="nav-link">
    //         Login
    //       </Link>

    //       <NavDropdown title="Dropdown" id="basic-nav-dropdown">
    //         <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
    //         <NavDropdown.Item href="#action/3.2">
    //           Another action
    //         </NavDropdown.Item>
    //         <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
    //         <NavDropdown.Divider />
    //         <NavDropdown.Item href="#action/3.4">
    //           Separated link
    //         </NavDropdown.Item>
    //       </NavDropdown>
    //     </Nav>
    //   </Navbar.Collapse>
    // </Navbar>
    <>
      {userInfo ? (
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
              <Link to="/" className="nav-link mr-3">
                Home
              </Link>
              <Link to="/about-us" className="nav-link  mr-3">
                About Us
              </Link>
              <Link to="/houses" className="nav-link  mr-3">
                houses
              </Link>

              <NavDropdown
                title={userInfo.name}
                id="basic-nav-dropdown"
                className="mr-3 text-white"
              >
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>

                <NavDropdown.Item>
                  {" "}
                  <Link to="/dashboard">Dashboard </Link>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      ) : (
        <>
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
                <Link to="/" className="nav-link   mr-3">
                  Home
                </Link>
                <Link to="/about-us" className="nav-link  mr-3">
                  About Us
                </Link>

                <Link to="/register" className="mr-3 ">
                  <button className=" register_button">Join Us</button>
                </Link>
                <Link to="/login">
                  <button className=" login_button">Sign in</button>
                </Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </>
      )}
    </>
  );
};

export default Navigation;

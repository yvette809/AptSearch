import React from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

const Home = () => {
  return (
    <div className="container-fluid home">
      <div className="intro text-center">
      <h1>ApptSearch</h1>
        <p>We help landlords advertise their houses</p>
        <Link to="/houses">
          <button>View Houses</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;

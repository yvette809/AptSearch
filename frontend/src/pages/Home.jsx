import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import Hero from '../components/Hero'


const Home = () => {
  return (
   
        <Hero>
        <h1>ApptSearch</h1>
        <p>We help landlords advertise their houses</p>
        <Link to="/houses">
          <button>View Houses</button>
        </Link>

        </Hero>
    //   </div>
    // </div>
  );
};

export default Home;

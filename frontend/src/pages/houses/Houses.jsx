import React, { useEffect } from "react";
import { getHouses } from "../../actions/house";
import { connect } from "react-redux";
import Loader from "../../components/Loader";
import HouseList from "./HouseList";
import Hero from "../../components/Hero";
import { Link } from "react-router-dom";

const Houses = ({ getHouses, houseState: { houses, loading, error } }) => {
  useEffect(() => {
    getHouses();
  }, []);

  if (loading) {
    return <Loader />;
  }

  console.log("HOUSES", houses);

  // const {houses, house, loading, error} = house
  return (
    <>
      <Hero>
        <p>View Your Affrodable Housing</p>
        <Link to="/">
          <button>Back To Home</button>
        </Link>
      </Hero>
      <div className="container-fluid mt-4">
        <div className="row ">
          {houses.length > 0 ? (
            houses.map((hors) => (
              <div className="col-sm-2 col-md-6 col-lg-2 ">
                <HouseList house={hors} id={hors._id} />
              </div>
            ))
          ) : (
            <h1>No house found</h1>
          )}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  houseState: state.houseState,
});
export default connect(mapStateToProps, { getHouses })(Houses);

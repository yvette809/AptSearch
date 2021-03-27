import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { connect } from "react-redux";
import { getHouse } from "../actions/house";
import Hero from "./Hero";

const HouseDetails = ({ getHouse, houseState: { house, loading, error }, match }) => {
  console.log("HOUSE =>", house);

  const { _id } = useParams();

  useEffect(() => {
    getHouse(_id);
  }, [getHouse, _id]);

  console.log("GETHOUSE", getHouse());

  return (
    <>
      <Hero>
        <Link to="/houses">
          <button>BACK TO HOUSES</button>
        </Link>
      </Hero>
      <div className="container">
        <img
          src={house.photo}
          alt=""
          className="mt-5 img-fluid"
          style={{ width: "400px", height: "200px" }}
        />

        <div className="details">
          <h1>{house.title}</h1>
          <p>{house.description}</p>
          <div className="details_info">
            <h1>Info</h1>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  houseState: state.houseState,
});

export default connect(mapStateToProps, { getHouse })(HouseDetails);

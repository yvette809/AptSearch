import React, { useEffect } from "react";
import Moment from "react-moment";
import { useParams, Link } from "react-router-dom";
import { connect } from "react-redux";
import { getHouse } from "../actions/house";
import Hero from "./Hero";
import Loader from "../components/Loader";

const HouseDetails = ({ getHouse, houseState, userLogin: { userInfo } }) => {
  const { house, error, loading } = houseState;

  console.log("HOUSE =>", house);

  const { _id } = useParams();
  console.log("ID", _id);

  useEffect(() => {
    getHouse(_id);
  }, []);

  return (
    <>
      <Hero>
        <Link to="/houses">
          <button>BACK TO HOUSES</button>
        </Link>
      </Hero>

      {loading ? (
        <Loader />
      ) : (
        <div className="container mt-2">
          <h1>{house.title}</h1>
          <img
            src={house.photo}
            alt=""
            className="mt-5 img-fluid"
            style={{ width: "400px", height: "200px" }}
          />

          <div className="details">
            <p>
              <strong>Description:</strong> {house.description}
            </p>
            <div className="details_info">
              <h1>Info</h1>
              <p>
                <strong>Price</strong> : {house.price}frs
              </p>
              <p>
                <strong>Self Contained </strong>:{house.selfContained}
              </p>
              {userInfo && (
                <p>
                  <strong>Landlord's Number</strong> : {house.telephone}
                </p>
              )}
              <p>
                <strong>Location</strong>: {house.location}
              </p>
              <p>
                <strong> Posted At:</strong>{" "}
                <Moment format="DD/MM/YYYY">{house.updatedAt}</Moment>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  houseState: state.houseState,
  userLogin: state.userLogin,
});

export default connect(mapStateToProps, { getHouse })(HouseDetails);

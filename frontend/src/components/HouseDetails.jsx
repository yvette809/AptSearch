import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { getHouse } from "../actions/house";

const HouseDetails = ({ getHouse, house: { house, loading, error } }) => {
    console.log ("HOUSE" , house)
  const { _id } = useParams();
//   const {title,description,price,selfContained,photo,telephone,location, address}= house

  useEffect(() => {
    getHouse(_id);
  },[]);

  return 
      
      <h1>Details</h1>

      
  
};

const mapStateToProps = (state) => ({
  house: state.house,
});

export default connect(mapStateToProps, { getHouse })(HouseDetails);

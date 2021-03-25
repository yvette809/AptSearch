import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const HouseList = ({ house }) => {
  return (
    <>
      <Card>
        <Card.Img variant="top" src={house.photo} />
        <Card.Body>
          <Card.Title>{house.title}</Card.Title>
          <Card.Text>{house.description}</Card.Text>
          <Link to={`/${house._id}`}>
            <Button variant="primary">Specifications</Button>
          </Link>
        </Card.Body>
      </Card>
    </>
  );
};


export default HouseList;

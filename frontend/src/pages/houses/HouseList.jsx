import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const HouseList = ({ house }) => {
  const { photo, title, description, _id } = house;
  return (
    <>
      <Card>
        <Card.Img variant="top" src={photo && photo} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{description}</Card.Text>
          <Link to={`houses/${_id}`}>
            <Button variant="primary">Specifications</Button>
          </Link>
        </Card.Body>
      </Card>
    </>
  );
};

export default HouseList;

import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { addHouse } from "../actions/house";
import Loader from "./Loader";

const AddHouse = ({
  addHouse,
  userLogin: { userInfo },
  houseState: { house },
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [selfContained, setSelfContaied] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [telephone, setTelephone] = useState("");
  const [location, setLocation] = useState("");
  //const [address, setAddress] = useState("");
  const [uploading, setUploading] = useState(false);

  const history = useHistory();

  const onSubmit = (e) => {
    e.preventDefault();
    if (userInfo) {
      addHouse({
        title,
        description,
        price,
        selfContained,
        telephone,
        location,
        photo,
      });

      history.push("/houses");
    }

    const uploadFileHandler = async (e, id) => {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("avatar", file);
      setUploading(true);

      try {
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };

        const { data } = await axios.post(
          ` http://localhost:5000/houses/${id}/upload`,
          formData,
          config
        );

        setPhoto(data);
        setUploading(false);
      } catch (error) {
        console.error(error);
        setUploading(false);
      }
    };
  };

  return (
    <div className="container mt-3">
      <Form onSubmit={onSubmit}>
        <Form.Control
          type="text"
          placeholder="provide a Title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mb-2"
        />
        <Form.Control
          type="text"
          placeholder="describe"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mb-2"
        />

        <Form.Control
          type="text"
          placeholder="Price"
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="mb-2"
        />

        {/* <Form.Control
          type="text"
          placeholder="Price"
          name="price"
          value={price}
          className="mb-2"
        /> */}
        <fieldset>
          <Form.Group as={Row}>
            <Form.Label as="legend" column sm={2}>
              Self Contained
            </Form.Label>
            <Col sm={10}>
              <Form.Check
                type="radio"
                label="Yes"
                name="formHorizontalRadios"
                id="formHorizontalRadios1"
                value="yes"
                onChange={(e) => setSelfContaied(e.currentTarget.value)}
              />
              <Form.Check
                type="radio"
                label="No"
                name="formHorizontalRadios"
                id="formHorizontalRadios2"
                value="No"
                onChange={(e) => setSelfContaied(e.currentTarget.value)}
              />
            </Col>
          </Form.Group>
        </fieldset>

        <Form.Control
          type="text"
          placeholder="telephone"
          name="telephone"
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
          className="mb-2"
        />

        <Form.Control
          type="location"
          placeholder="location"
          name="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="mb-2"
        />
        <Form.File
          id="image-file"
          label="Choose File"
          className="mb-3"
          custom
          onChange={() => uploadFileHandler(house._id)}
        ></Form.File>
        {uploading && <Loader />}

        <Button variant="primary" type="submit" onClick={onSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  houseState: state.houseState,
  userLogin: state.userLogin,
});

export default connect(mapStateToProps, { addHouse })(AddHouse);

import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect, useHistory } from "react-router-dom";

import { Form, Button, Row, Col } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { register } from "../actions/auth";

const Register = ({ register, userRegister, userLogin, userDetails }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [bio, setBio] = useState("");
  const [role, setRole] = useState("");

  const [message, setMessage] = useState(null);

  const { loading, error, user } = userRegister;
  const { userInfo } = userLogin;
  const history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      register({ name, email, password, bio });
    }

    if (userLogin) {
      //   return <Redirect to="/houses" />;
      history.push("/login");
    }
  };

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger" />}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Label htmlFor="role"> Are You a Landlord?</Form.Label>
        <Form.Control
          type="checkbox"
          value={role}
          onChange={(e) => setRole(e.currentTarget.checked)}
          checked={role}
        ></Form.Control>

        {role && (
          <Form.Control
            as="textarea"
            name="text"
            cols="30"
            rows="5"
            placeholder="Let The Tenants Know who you are"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="mb-2"
            required
          />
        )}

        <Button type="submit" variant="primary">
          Register
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          Have an Account? <Link to="/login">Login</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};
const mapStateToProps = (state) => ({
  userRegister: state.userRegister,
  userLogin: state.userLogin,
  userDetails: state.userDetails,
});

export default connect(mapStateToProps, { register })(Register);

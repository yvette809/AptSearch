import React, { useState, useEffect } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { login } from "../actions/auth";

const Login = ({ login, userLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, error, userInfo } = userLogin;

  const history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();
    login(email, password);
  };

  if (userInfo) {
    // return <Redirect to="/houses" />;
    history.push("/houses");
  }

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
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

        <Button type="submit" variant="primary" className="login_button">
          Sign In
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          Don't have an Account? <Link to="/register">Register</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

const mapStateToProps = (state) => ({
  userLogin: state.userLogin,
});

export default connect(mapStateToProps, { login })(Login);

import React, { Component } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Form, Button } from "react-bootstrap";
import NavBar from "./NavBar";

class SignUp extends Component {
  render() {
    return (
      <div>
        <NavBar renderBool={[false, false, false, false]} />
        <h2>Create an Account!</h2>
        <Form>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter name" />
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <LinkContainer to="/home">
            <Button
              onClick={() => {
                alert("Successfully created an account.");
              }}
            >
              Submit
            </Button>
          </LinkContainer>
          <LinkContainer to="/">
            <Button>Already Have an Account?</Button>
          </LinkContainer>
        </Form>
      </div>
    );
  }
}

export default SignUp;

import React, { Component } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Form, Button } from "react-bootstrap";
import NavBar from "./NavBar";

class Login extends Component {
  render() {
    return (
      <div>
        <NavBar renderBool={[false, false, false, false]} loginPage={0} />
        <h2>Login!</h2>
        <Form>
          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              This email will be used to advertise your group.
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <LinkContainer to="/home">
            <Button>Login</Button>
          </LinkContainer>
          <LinkContainer to="/signup">
            <Button>Create an Account</Button>
          </LinkContainer>
          <LinkContainer to="/forgotpassword">
            <Button>Forgot Password?</Button>
          </LinkContainer>
        </Form>
      </div>
    );
  }
}

export default Login;

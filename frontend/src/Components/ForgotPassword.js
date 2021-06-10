import React, { Component } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Form, Button } from "react-bootstrap";
import NavBar from "./NavBar";

class ForgotPassword extends Component {
  render() {
    return (
      <div>
        <NavBar renderBool={[false, false, false, false]} />
        <h2>Reset Password</h2>
        <Form>
          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              A reset link will be sent to your email.
            </Form.Text>
          </Form.Group>
          <LinkContainer to="/">
            <Button>Remember Your Password?</Button>
          </LinkContainer>
          <Button
            onClick={() => {
              alert("Email sent");
            }}
          >
            Send email
          </Button>
        </Form>
      </div>
    );
  }
}

export default ForgotPassword;

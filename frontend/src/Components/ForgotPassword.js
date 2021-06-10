import React, { Component } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Form, Button } from "react-bootstrap";

class ForgotPassword extends Component {
  render() {
    return (
      <div>
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
          <Button>Send email</Button>
        </Form>
      </div>
    );
  }
}

export default ForgotPassword;

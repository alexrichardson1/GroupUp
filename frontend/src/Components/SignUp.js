import React, { Component } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Form, Button } from "react-bootstrap";

class SignUp extends Component {
  render() {
    return (
      <div>
        <h2>Create an Account!</h2>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <LinkContainer to="/">
            <Button>Login</Button>
          </LinkContainer>
          <LinkContainer to="/signup">
            <Button type="button">Create an Account</Button>
          </LinkContainer>
          <LinkContainer to="/forgotpassword">
            <Button>Forgot Password?</Button>
          </LinkContainer>
        </Form>
      </div>
      //     </ul>
      //   </fieldset>
      //   <LinkContainer to="/home">
      //     <button>Submit</button>
      //   </LinkContainer>
      //   <LinkContainer to="/">
      //     <button type="button">Have an Account?</button>
      //   </LinkContainer>
      // </form>
    );
  }
}

export default SignUp;

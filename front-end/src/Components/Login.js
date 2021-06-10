import React, { Component } from "react";
import { LinkContainer } from "react-router-bootstrap";

class Login extends Component {
  render() {
    return (
      <form>
        <h2>Log In!</h2>
        <fieldset>
          <ul>
            <li>
              <label for="username">Username:</label>
              <input type="text" id="username" required />
            </li>
            <li>
              <label for="password">Password:</label>
              <input type="password" id="password" required />
            </li>
          </ul>
        </fieldset>
        <LinkContainer to="/home">
          <button>Login</button>
        </LinkContainer>
        <LinkContainer to="/signup">
          <button type="button">Create an Account</button>
        </LinkContainer>
        <LinkContainer to="/forgotpassword">
          <button>Forgot Password?</button>
        </LinkContainer>
      </form>
    );
  }
}

export default Login;

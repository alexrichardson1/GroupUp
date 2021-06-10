import React, { Component } from "react";
import { LinkContainer } from "react-router-bootstrap";

class SignUp extends Component {
  render() {
    return (
      <form>
        <h2>Create an Account!</h2>
        <fieldset>
          <ul>
            <li>
              <label for="username">Username:</label>
              <input type="text" id="username" required />
            </li>
            <li>
              <label for="email">Email:</label>
              <input type="email" id="email" required />
            </li>
            <li>
              <label for="password">Password:</label>
              <input type="password" id="password" required />
            </li>
          </ul>
        </fieldset>
        <LinkContainer to="/home">
          <button>Submit</button>
        </LinkContainer>
        <LinkContainer to="/">
          <button type="button">Have an Account?</button>
        </LinkContainer>
      </form>
    );
  }
}

export default SignUp;

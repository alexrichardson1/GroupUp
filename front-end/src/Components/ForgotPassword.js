import React, { Component } from "react";
import { LinkContainer } from "react-router-bootstrap";

class ForgotPassword extends Component {
  render() {
    return (
      <form>
        <h2>Reset Password</h2>
        <fieldset>
          <legend>Password Reset</legend>
          <ul>
            <li>
              <em>A reset link will be sent to your inbox!</em>
            </li>
            <li>
              <label for="email">Email:</label>
              <input type="email" id="email" required />
            </li>
          </ul>
        </fieldset>
        <button>Send Reset Link</button>
        <button type="button" onClick={() => this.changeView("logIn")}>
          Go Back
        </button>
      </form>
    );
  }
}

export default ForgotPassword;

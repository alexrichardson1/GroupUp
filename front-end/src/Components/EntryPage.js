import React, { Component } from "react";
import { LinkContainer } from "react-router-bootstrap";

class EntryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentView: "logIn",
    };
  }

  changeView = (view) => {
    this.setState({
      currentView: view,
    });
  };

  currentView = () => {
    switch (this.state.currentView) {
      case "signUp":
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
            <button type="button" onClick={() => this.changeView("logIn")}>
              Have an Account?
            </button>
          </form>
        );
      case "logIn":
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
                <li>
                  <i />
                  <a onClick={() => this.changeView("pwdReset")} href="#">
                    Forgot Password?
                  </a>
                </li>
              </ul>
            </fieldset>
            <LinkContainer to="/home">
              <button>Login</button>
            </LinkContainer>
            <button type="button" onClick={() => this.changeView("signUp")}>
              Create an Account
            </button>
          </form>
        );
      case "pwdReset":
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
      default:
        break;
    }
  };

  render() {
    return <section id="entry-page">{this.currentView()}</section>;
  }
}

// ReactDOM.render(<EntryPage />, document.getElementById("app"));

export default EntryPage;

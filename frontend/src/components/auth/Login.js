import React, { useState, useContext } from "react";
// import { LinkContainer } from "react-router-bootstrap";s
import { Form, Button } from "react-bootstrap";
import NavBar from "components/NavBar";
import { UserContext } from "components/auth/UserContext";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  // const { value, setValue } = useContext(UserContext);
  const { setValue } = useContext(UserContext);

  const history = useHistory();

  /* Functions to handle form submission */
  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;

    setUsername(value);
    console.log("gelllo");
  };

  const handleSubmit = () => {
    setValue(username);
    history.push("/home");
  };

  return (
    <div>
      <NavBar renderBool={[false, false, false, false]} loginPage={0} />
      <h2>Login!</h2>
      <Form>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="John Smith"
            name="username"
            value={username}
            onChange={handleInputChange}
          />
        </Form.Group>
        {/* <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group> */}
        {/* <LinkContainer to="/home"> */}
        <Button onClick={handleSubmit}>Login</Button>
        {/* </LinkContainer> */}
        {/* <LinkContainer to="/signup">
            <Button>Create an Account</Button>
          </LinkContainer>
          <LinkContainer to="/forgotpassword">
            <Button>Forgot Password?</Button>
          </LinkContainer> */}
      </Form>
    </div>
  );
};

export default Login;

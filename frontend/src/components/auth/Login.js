import React, { useState, useContext } from "react";
// import { LinkContainer } from "react-router-bootstrap";s
import { Form, Button } from "react-bootstrap";
import NavBar from "components/NavBar";
import { UserContext } from "components/auth/UserContext";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { config } from "Constants";

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [username, setUsername] = useState("");

  const { setValue } = useContext(UserContext);
  const history = useHistory();
  const date = new Date().toISOString();

  const updateLogin = async () => {
    var result = {};
    await axios
      .post(`${config.API_URL}/user/login/update`, {
        email: userEmail,
        time: date,
      })
      .then((res) => {
        const group = res.data;
        result = group;
        alert("Successfully logged in!");
      })
      .catch((error) => {
        console.log(error);
      });
    return result;
  };

  /* Functions to handle form submission */
  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    if (target.name === "username") {
      setUsername(value);
    } else {
      setUserEmail(value);
    }
  };

  const handleSubmit = () => {
    setValue(username);
    updateLogin();
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
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="johnsmith@email.com"
            name="userEmail"
            value={userEmail}
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

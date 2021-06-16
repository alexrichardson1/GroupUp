import React, { useState } from "react";
// import { LinkContainer } from "react-router-bootstrap";s
import { Form, Button } from "react-bootstrap";
import NavBar from "components/NavBar";
import { UserContext } from "components/auth/UserContext";
import { useContext } from "react";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  // const { value, setValue } = useContext(UserContext);
  const { setValue } = useContext(UserContext);

  const history = useHistory();

  /* Functions to handle form submission */
  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;

    setUserEmail(value);
    console.log("gelllo");
  };

  const handleSubmit = () => {
    setValue(userEmail);
    history.push("/home");
  };

  return (
    <div>
      <NavBar renderBool={[false, false, false, false]} loginPage={0} />
      <h2>Login!</h2>
      <Form>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="you@email.com"
            name="userEmail"
            value={userEmail}
            onChange={handleInputChange}
          />
          <Form.Text className="text-muted">
            Leader is just the point of contact, it can really be any group
            member.
          </Form.Text>
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

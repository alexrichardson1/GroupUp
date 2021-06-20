import React, { useState, useContext, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import NavBar from "components/NavBar";
import { UserContext } from "components/auth/UserContext";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { config } from "Constants";
import { LinkContainer } from "react-router-bootstrap";

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [users, setUsers] = useState([]);

  const { setValue, setEmail } = useContext(UserContext);
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

  const updateActive = async () => {
    let userFullName = "";
    if (userEmail !== "") {
      userFullName = users.filter((u) => u.email === userEmail)[0].fullname;
    }
    var result = {};
    await axios
      .post(`${config.API_URL}/active/email/update`, {
        email: userEmail,
        fullname: userFullName,
      })
      .then((res) => {
        const group = res.data;
        result = group;
      })
      .catch((error) => {
        console.log(error);
      });
    return result;
  };

  useEffect(() => {
    const getAllUsers = async () => {
      var result = [];
      await axios
        .get(`${config.API_URL}/user/`)
        .then((res) => {
          const projects = res.data;
          result = projects;
          setUsers(result);
          console.log(projects);
        })
        .catch((error) => {
          console.log(error);
        });
      return result;
    };
    document.title = "Login";
    getAllUsers();
  }, []);

  /* Functions to handle form submission */
  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    setUserEmail(value);
  };

  const handleSubmit = () => {
    setEmail(userEmail);
    updateLogin();
    updateActive();
    console.log(users);
    const user = users.filter((u) => u.email === userEmail)[0].fullname;
    console.log(user);
    setValue(user);
    history.push("/home");
  };

  return (
    <div>
      <NavBar renderBool={[false, false, false, false]} loginPage={0} />
      <h2>Login</h2>
      <Form>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="johnsmith@example.com"
            name="userEmail"
            value={userEmail}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button onClick={handleSubmit}>Login</Button>
      </Form>
      <LinkContainer to="/signup">
        <Button>Haven't Got An Account</Button>
      </LinkContainer>
    </div>
  );
};

export default Login;

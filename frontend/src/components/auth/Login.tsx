import { useState, useContext, useEffect } from "react";
import { Alert, Form, Button } from "react-bootstrap";
import NavBar from "components/NavBar";
import { UserContext } from "components/auth/UserContext";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { config } from "Constants";
import { LinkContainer } from "react-router-bootstrap";
import { UserT } from "types/types";
import { dummyUser } from "api";

const Login = () => {
  const [userEmail, setUserEmail] = useState<string>("");
  const [users, setUsers] = useState<UserT[]>([]);
  const [invalid, setInvalid] = useState(false);
  const { setUser, setEmail } = useContext(UserContext);
  const history = useHistory();
  const date = new Date().toISOString();

  const updateLogin = async () => {
    await axios
      .post(`${config.API_URL}/user/login/update`, {
        email: userEmail,
        time: date,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateActive = async () => {
    var userFullName = dummyUser.fullname;
    if (userEmail !== "") {
      const filteredUsers = users.filter((u) => u.email === userEmail);
      if (filteredUsers[0]) {
        userFullName = filteredUsers[0].fullname;
      }
    }
    var result: UserT = dummyUser;
    await axios
      .post(`${config.API_URL}/active/email/update`, {
        email: userEmail,
        fullname: userFullName,
      })
      .then((res) => {
        result = res.data;
      })
      .catch((error) => {
        console.error(error);
      });
    return result;
  };

  useEffect(() => {
    const getAllUsers = async () => {
      var result: UserT[] = [];
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
  const handleInputChange = (event: any) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    setUserEmail(value);
  };

  const handleSubmit = () => {
    const emails = users.map((user) => user.email);
    if (!emails.includes(userEmail)) {
      setInvalid(true);
      return;
    }
    setEmail(userEmail);
    updateLogin();
    updateActive();
    console.log(users);
    var user = dummyUser;
    const filteredUsers = users.filter((u) => u.email === userEmail);
    if (filteredUsers[0]) {
      user = filteredUsers[0];
    }
    console.log(user);
    setUser(user.fullname);
    history.push("/home");
  };

  function wrongLogin() : JSX.Element | null {
    if (invalid) {
      return <Alert variant="danger">User with email not found.</Alert>
    }
    return null
  }

  return (
    <div>
      <NavBar renderBool={[false, false, false, false]} loginPage={0} />
      <h2>Login</h2>
      {wrongLogin()}
      <Form>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="johnsmith@example.com"
            name="userEmail"
            value={userEmail}
            onChange={handleInputChange}
            isInvalid={userEmail === ""}
          />
        </Form.Group>
        <Button disabled={userEmail === ""} onClick={handleSubmit}>
          Login
        </Button>
        <LinkContainer to="/signup">
          <Button>Haven't Got An Account</Button>
        </LinkContainer>
        <LinkContainer to="/forgotpassword">
          <Button>Forgotten Your Password</Button>
        </LinkContainer>
      </Form>
    </div>
  );
};

export default Login;

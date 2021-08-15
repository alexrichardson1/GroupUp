import { useState, useContext, useEffect } from "react";
import { Alert, Form, Button } from "react-bootstrap";
import NavBar from "components/NavBar";
import { UserContext } from "components/auth/UserContext";
import { useHistory } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { UserT } from "types/types";
import {
  dummyUser,
  getUsers,
  setActive,
  updateUserLastLogin,
} from "common/api";

const Login = () => {
  const [userEmail, setUserEmail] = useState<string>("");
  const [users, setUsers] = useState<UserT[]>([]);
  const [invalidLogin, setInvalidLogin] = useState(false);
  const { setUser, setEmail } = useContext(UserContext);
  const history = useHistory();
  const date = new Date().toISOString();

  function getFullName() {
    if (userEmail === "") {
      return dummyUser.fullname;
    }
    const filteredUsers = users.filter((u) => u.email === userEmail);
    if (filteredUsers[0]) {
      return filteredUsers[0].fullname;
    }
    return dummyUser.fullname;
  }

  async function setup() {
    setUsers(await getUsers());
  }

  useEffect(() => {
    document.title = "Login";
    setup();
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
      setInvalidLogin(true);
      return;
    }
    setEmail(userEmail);
    updateUserLastLogin(userEmail, date);
    setActive(userEmail, getFullName());
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

  function wrongLogin(): JSX.Element | null {
    if (invalidLogin) {
      return <Alert variant="danger">User with email not found.</Alert>;
    }
    return null;
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

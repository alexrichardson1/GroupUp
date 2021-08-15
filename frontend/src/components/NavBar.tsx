import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useState, useEffect } from "react";
import { getActive, setActive } from "common/api";

function getLinkElems(
  renderBool: boolean[],
  linkList: string[],
  linkNameList: string[]
) {
  const boldPosition = renderBool.filter((item) => item).length;
  const navLinks = [];
  for (let i = 0; i < boldPosition; i++) {
    if (i !== boldPosition - 1) {
      navLinks.push(
        <Nav.Link
          key={i}
          style={{ color: "rgb(238, 237, 237)" }}
          href={linkList[i]}
        >
          {linkNameList[i]}
          <img
            className="processImage"
            src={process.env.PUBLIC_URL + "/right-caret.svg"}
            alt="drop down arrow"
          />
        </Nav.Link>
      );
    } else {
      navLinks.push(
        <Navbar.Brand key={i} style={{ color: "rgb(238, 237, 237)" }}>
          {linkNameList[i]}
        </Navbar.Brand>
      );
    }
  }
  // console.log("HELLO  ", navLinks);
  return navLinks;
}

interface Props {
  renderBool: boolean[];
  create?: boolean;
  id?: number;
  loginPage?: number;
  helpPage?: boolean;
  savedSearches?: boolean;
  hackathon?: boolean;
}

const NavBar = ({
  renderBool,
  create,
  id,
  loginPage,
  helpPage,
  savedSearches,
  hackathon,
}: Props) => {
  const linkNameList = [
    savedSearches ? "Saved Searches" : "Home",
    "Select Hackathon",
    hackathon ? "Register a hackathon" : "Group Listings",
    create ? "Create a group" : "Join a group",
  ];
  const linkList = ["/home", "/selection", "/listing/" + id, ""];
  const logginIn = renderBool.reduce((val, next) => {
    return val && next;
  });
  const [fullName, setFullName] = useState("");
  // const { value } = useContext(UserContext);
  const loginMessage = () => {
    switch (loginPage) {
      case 0:
        return "Login";
      case 1:
        return "Sign Up";
      case 2:
        return "Forgot Password?";
      default:
        return " ";
    }
  };
  const help = "Help";

  const links = getLinkElems(renderBool, linkList, linkNameList);

  async function setup() {
    const { fullname } = await getActive();
    setFullName(fullname);
  }

  useEffect(() => {
    setup();
  }, []);

  return (
    <Navbar className="navBar" expand="lg" fixed="top">
      <Navbar.Brand
        style={{
          color: "white",
        }}
      >
        <LinkContainer to="/home">
          <img
            className="logoImage"
            src="https://i.imgur.com/w92t1xH.png"
            alt="group up logo"
          />
        </LinkContainer>
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Navbar.Collapse>
        <Nav className="mr=auto">
          {!logginIn && (
            <Navbar.Brand style={{ color: "rgb(238, 237, 237)" }}>
              {loginMessage()}
            </Navbar.Brand>
          )}
          {helpPage && (
            <Navbar.Brand style={{ color: "rgb(238, 237, 237)" }}>
              {help}
            </Navbar.Brand>
          )}
          {links.map((link) => {
            return link;
          })}
        </Nav>

        <Nav className="ms-auto">
          {/* <Nav className="ms-auto" pullright> */}
          <LinkContainer to="/help">
            <Navbar.Brand
              title="Help"
              id="collasible-nav-dropdown"
              className="ml-auto navHelp"
            >
              <img
                className="splitterImage"
                src={process.env.PUBLIC_URL + "/info-circle.svg"}
                alt="help"
              />
            </Navbar.Brand>
          </LinkContainer>
          {fullName !== "" ? (
            <NavDropdown
              className="navAccount"
              title={
                <span className="accountSpan">
                  {fullName}
                  <img
                    className="splitterImage"
                    src={process.env.PUBLIC_URL + "/person-circle.svg"}
                    alt="my-account"
                  />
                </span>
              }
              id="collasible-nav-dropdown"
              style={{ color: "rgb(238, 237, 237)" }}
            >
              <LinkContainer to="/savedsearches" activeClassName="">
                <NavDropdown.Item>Saved Search</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/myGroups" activeClassName="">
                <NavDropdown.Item>My Groups</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Divider />
              <LinkContainer to="/" activeClassName="">
                <NavDropdown.Item onClick={() => setActive("", "")}>
                  Sign Out
                </NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          ) : null}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;

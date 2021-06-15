import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function getLinkElems(renderBool, linkList, linkNameList) {
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

const NavBar = ({ renderBool, create, id, loginPage, helpPage }) => {
  const linkNameList = [
    "Home",
    "Select Group",
    "Group Listings",
    create ? "Create a group" : "Join a group",
  ];
  const linkList = ["/home", "/selection", "/listing/" + id, ""];
  const logginIn = renderBool.reduce((val, next) => {
    return val && next;
  });
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
            alt="logoooo"
          />
        </LinkContainer>
        <img
          className="splitterImage"
          src={process.env.PUBLIC_URL + "/three-dots.svg"}
          alt="splitter"
        />
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

        <Nav className="ms-auto" pullRight>
          <LinkContainer to="/help">
            <Navbar.Brand
              title="Help"
              id="collasible-nav-dropdown"
              className="ml-auto navHelp"
              style={{ color: "rgb(238, 237, 237)" }}
            >
              <img
                className="splitterImage"
                src={process.env.PUBLIC_URL + "/info-circle.svg"}
                alt="splitter"
              />
            </Navbar.Brand>
          </LinkContainer>
          <NavDropdown
            className="navDropdown"
            expand
            title="Account"
            id="collasible-nav-dropdown"
          >
            <LinkContainer to="/home" activeClassName="">
              <NavDropdown.Item href="#action/3.1">My Groups</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="" activeClassName="">
              <NavDropdown.Item href="#action/3.2">My Account</NavDropdown.Item>
            </LinkContainer>
            <NavDropdown.Divider />
            <LinkContainer to="/" activeClassName="">
              <NavDropdown.Item href="#action/3.4">Sign Out</NavDropdown.Item>
            </LinkContainer>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

function getLinkElems(renderBool, linkList, linkNameList) {
  const boldPosition = renderBool.filter((item) => item).length;
  const navLinks = [];
  for (let i = 0; i < boldPosition; i++) {
    if (i !== boldPosition - 1) {
      navLinks.push(
        <Nav.Link style={{ color: "rgb(238, 237, 237)" }} href={linkList[i]}>
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
        <Navbar.Brand style={{ color: "rgb(238, 237, 237)" }}>
          {linkNameList[i]}
        </Navbar.Brand>
      );
    }
  }
  console.log("HELLO  ", navLinks);
  return navLinks;
}

const NavBar = ({ renderBool, create, id }) => {
  const linkNameList = [
    "Home",
    "Select Group",
    "Group Listings",
    create ? "Create a group" : "Join a group",
  ];
  const linkList = ["/home", "/selection", "/listing/" + id, ""];

  const links = getLinkElems(renderBool, linkList, linkNameList);
  return (
    <Navbar className="navBar" expand="lg" fixed="top">
      <Navbar.Brand
        style={{
          color: "white",
        }}
      >
        <img
          className="logoImage"
          src="https://i.imgur.com/w92t1xH.png"
          alt="logoooo"
        />
        <img
          className="splitterImage"
          src={process.env.PUBLIC_URL + "/three-dots.svg"}
          alt="splitter"
        />
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {links.map((link) => {
            return link;
          })}
          {/* <Nav.Link className="navLink" href="/">
            Home
          </Nav.Link>
          <Nav.Link className="navLink" href="/selection">
            <img
              className="processImage"
              src={process.env.PUBLIC_URL + "/right-caret.svg"}
              alt="drop down arrow"
            />
            Select Hackathon
          </Nav.Link> */}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;

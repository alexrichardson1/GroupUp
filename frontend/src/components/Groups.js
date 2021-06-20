import { Component } from "react";
import Group from "components/Group";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "components/NavBar";
import axios from "axios";
import Filter from "components/Filter";
import { config } from "Constants";
import UserContext from "components/auth/UserContext";

export default class Groups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      project: "",
      requirements: [],
      filteredGroups: [],
      activeFilters: new Map(),
      modalShow: false,
    };
  }

  handleClose() {
    this.setState({ modalShow: false });
  }
  handleShow() {
    this.setState({ modalShow: true });
    for (const [k, v] of this.state.activeFilters.entries()) {
      console.log(k + " -> " + v);
    }
  }

  groupIsFull(group) {
    return 1 + group.teammates.length >= group.maxmembers;
  }

  async getGroups() {
    var result = [];
    await axios
      .post(`${config.API_URL}/group/hackathon`, {
        hackathonid: this.props.id,
      })

      .then((res) => {
        const groups = res.data;
        result = groups;
      })
      .catch((error) => {
        console.log(error);
      });
    return result.filter((group) => !this.groupIsFull(group));
  }

  async getProject() {
    var result = "";
    await axios
      .get(`${config.API_URL}/project`)
      .then((res) => {
        const projects = res.data;
        result = projects.filter(
          (proj) => proj.id === Number(this.props.id)
        )[0];
      })
      .catch((error) => {
        console.error(error);
      });
    return result;
  }

  async postFilter(userEmail, filters) {
    console.log("added filters for: " + userEmail);
    console.log("Filters: " + filters);
    var result = {};
    await axios
      .post(`${config.API_URL}/user/activefilter/update`, {
        filters: filters,
        email: userEmail,
      })
      .then((res) => {
        const filters = res.data;
        result = filters;
      })
      .catch((error) => {
        console.log(error);
      });
    return result;
  }

  async componentDidMount() {
    this.setState({ groups: await this.getGroups() });
    this.setState({ project: await this.getProject() });
    this.setState({ filteredGroups: await this.getGroups() });
    this.setState({ requirements: this.hackathonReqs() });
    document.title = "Available Listings";
  }

  hackathonReqs = () => {
    return this.state.project.requirements;
  };

  allReqVars = (reqIndex) => {
    const vars = [];
    this.state.groups.map((g) => vars.push(g.requirements[reqIndex]));
    return [...new Set(vars)];
  };

  filterGroupsOnReq = (reqName, reqVar) => {
    this.addFilter(reqName, reqVar);
    this.setState(
      (state) => ({ filteredGroups: state.groups }),
      () => this.refilter()
    );
  };

  refilter = () => {
    for (const [, v] of this.state.activeFilters.entries()) {
      let newFilteredGroups = [];
      if (v === "Any") {
        console.log("HHHH");
        newFilteredGroups = [...this.state.filteredGroups];
      } else {
        for (let i = 0; i < this.state.filteredGroups.length; i++) {
          if (this.state.filteredGroups[i].requirements.includes(v)) {
            newFilteredGroups.push(this.state.filteredGroups[i]);
          }
        }
      }
      // eslint-disable-next-line
      this.state.filteredGroups = newFilteredGroups;
      this.setState({ ...this.state });
    }
  };

  addFilter = (key, value) => {
    this.setState({ activeFilters: this.state.activeFilters.set(key, value) });
  };

  removeFilter = (key) => {
    this.filterGroupsOnReq(key, "Any");
  };

  createFilterComponents = () => {
    const comps = [];
    this.state.requirements.forEach((req) => {
      comps.push(
        <Filter
          requirementName={req}
          requirementsList={this.allReqVars(
            this.state.requirements.indexOf(req)
          )}
          filterFunction={this.filterGroupsOnReq}
          resetFunction={this.removeFilter}
        />
      );
    });
    return comps;
  };

  saveFilters = (email) => {
    console.log(email);
  };

  postEmail = ({ email }) => {
    const vals = [];
    for (const [, v] of this.state.activeFilters.entries()) {
      vals.push(v);
    }
    this.postFilter(email, vals);
  };

  render() {
    return (
      <UserContext.Consumer>
        {({ email }) => (
          <div>
            <Navbar renderBool={[true, true, true, false]} create={false} />
            <Modal show={this.state.modalShow} onHide={this.handleClose}>
              <Modal.Header>
                <Modal.Title>Saved</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <p>
                  Your current filtered search has been saved. Find it under
                  your account.
                </p>
              </Modal.Body>

              <Modal.Footer>
                <Button variant="secondary" onClick={() => this.handleClose()}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
            <Container>
              <Row>
                <Col>
                  <h3>
                    {this.state.filteredGroups.length} Groups looking for
                    members in: 
                    {this.state.project.name}
                  </h3>
                </Col>
                <Col className="advertCol align-items-center">
                  <Button
                    className="advertBtn"
                    onClick={() => {
                      this.handleShow();
                      this.postEmail(email);
                    }}
                  >
                    Save this search
                  </Button>
                  <LinkContainer to={`/createGroup/${this.props.id}`}>
                    <Button className="advertBtn">Advertise my group</Button>
                  </LinkContainer>
                </Col>
              </Row>
              {/* <Row> */}

              {/* </Row> */}
              <Row>
                <Col className="filterCol">
                  <h5>Filters:</h5>
                  {this.createFilterComponents()}
                </Col>
                <Col className="listingsCol">
                  {this.state.filteredGroups.map((group) => (
                    <Group
                      group={group}
                      requirementNames={this.state.requirements}
                      key={group.id}
                    />
                  ))}
                </Col>
              </Row>
            </Container>
          </div>
        )}
      </UserContext.Consumer>
    );
  }
}

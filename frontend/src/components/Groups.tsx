import { Component } from "react";
import Group from "components/Group";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "components/NavBar";
import Filter from "components/Filter";
import { UserContext } from "components/auth/UserContext";
import { GroupT, ProjectT } from "types/types";
import { dummyProject, getGroups, getProject, setFilters } from "common/api";

interface Props {
  id: number;
}

interface State {
  groups: GroupT[];
  projects: ProjectT;
  requirements: string[];
  filteredGroups: GroupT[];
  activeFilters: Map<string, string>;
  modalShow: boolean;
}

export default class Groups extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      groups: [],
      projects: dummyProject,
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

  groupIsFull(group: GroupT) {
    return 1 + group.teammates.length >= group.maxmembers;
  }

  override async componentDidMount() {
    this.setState({ groups: await getGroups() });
    this.setState({ projects: await getProject(this.props.id) });
    this.setState({ filteredGroups: await getGroups() });
    this.setState({ requirements: this.hackathonReqs() });
    document.title = "Available Listings";
  }

  hackathonReqs = () => {
    return this.state.projects.requirements;
  };

  allReqVars = (reqIndex: number) => {
    const vars: string[] = [];
    this.state.groups.forEach((g) => {
      const requirement = g.requirements[reqIndex];
      if (requirement) {
        vars.push(requirement);
      }
    });
    return [...new Set(vars)];
  };

  filterGroupsOnReq = (reqName: string, reqVar: string) => {
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
        newFilteredGroups = [...this.state.filteredGroups];
      } else {
        for (let i = 0; i < this.state.filteredGroups.length; i++) {
          if (
            this.state.filteredGroups[i] &&
            //@ts-ignore
            this.state.filteredGroups[i].requirements.includes(v)
          ) {
            newFilteredGroups.push(this.state.filteredGroups[i]);
          }
        }
      }
      //@ts-ignore
      this.state.filteredGroups = newFilteredGroups;
      this.setState({ ...this.state });
    }
  };

  addFilter = (key: string, value: string) => {
    this.setState({ activeFilters: this.state.activeFilters.set(key, value) });
  };

  removeFilter = (key: string) => {
    this.filterGroupsOnReq(key, "Any");
  };

  createFilterComponents = () => {
    const comps: JSX.Element[] = [];
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

  saveFilters = (email: string) => {
    console.log(email);
  };

  postEmail = (email: string) => {
    const vals = [];
    for (const [, v] of this.state.activeFilters.entries()) {
      vals.push(v);
    }
    setFilters(email, vals);
  };

  override render() {
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
                    {this.state.projects.name}
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
                      projectId={this.props.id}
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

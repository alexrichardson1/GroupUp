import { Component } from "react";
import Group from "components/Group";
import { Button, Col, Container, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "components/NavBar";
import axios from "axios";
import Filter from "components/Filter";

export default class Groups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      project: "",
      requirements: [],
      filteredGroups: [],
      activeFilters: new Map(),
    };
  }

  async getGroups() {
    var result = [];
    await axios
      .post("http://localhost:5000/group/hackathon", {
        hackathonid: this.props.id,
      })

      .then((res) => {
        const groups = res.data;
        result = groups;
      })
      .catch((error) => {
        console.log(error);
      });
    return result;
  }

  async getProject() {
    var result = "";
    await axios
      .get("http://localhost:5000/project")
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

  async componentDidMount() {
    this.setState({ groups: await this.getGroups() });
    this.setState({ project: await this.getProject() });
    this.setState({ filteredGroups: this.state.groups });
    this.setState({ requirements: this.hackathonReqs() });
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
    console.log("---Adding/changing filter---");
    console.log("Old list of filters:");
    console.log(this.state.activeFilters);
    console.log(reqName + " " + reqVar);
    this.addFilter(reqName, reqVar);
    this.state.filteredGroups = this.state.groups;
    this.setState({ ...this.state });
    for (const [k, v] of this.state.activeFilters.entries()) {
      const newFilteredGroups = [];
      for (let i = 0; i < this.state.filteredGroups.length; i++) {
        if (this.state.filteredGroups[i].requirements.includes(v)) {
          newFilteredGroups.push(this.state.filteredGroups[i]);
        }
      }
      this.state.filteredGroups = newFilteredGroups;
      this.setState({ ...this.state });
    }
    console.log(this.state.filteredGroups);
    console.log("-------");
  };

  addFilter = (key, value) => {
    this.setState({ activeFilters: this.state.activeFilters.set(key, value) });
  };

  removeFilter = (key) => {
    this.setState({ activeFilters: this.state.activeFilters.set(key, "Any") });
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

  render() {
    return (
      <div>
        <Navbar renderBool={[true, true, true, false]} create={false} />
        <Container>
          <Row>
            <h3>
              {this.state.filteredGroups.length} Groups looking for members in: 
              {this.state.project.name}
            </h3>
          </Row>
          <Row>
            <LinkContainer to={`/createGroup/${this.props.id}`}>
              <Button>Advertise my group!</Button>
            </LinkContainer>
          </Row>
          <Row>
            <Col>{this.createFilterComponents()}</Col>
            <Col>
              {this.state.filteredGroups.map((group) => (
                <Group group={group} key={group.id} />
              ))}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

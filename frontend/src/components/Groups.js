import { Component } from "react";
import Group from "components/Group";
import { Button, Col, Container, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "components/NavBar";
import axios from "axios";
import Filter from "components/Filter";
import { config } from "../Constants";

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
    return result;
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
        console.log(newFilteredGroups);
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
    );
  }
}

import { Component } from "react";
import Group from "components/Group";
import { Button, Col, Container, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "components/NavBar";
import axios from "axios";

export default class GroupsNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      projectName: "",
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

  async getProjectName() {
    var result = "";
    await axios
      .get("http://localhost:5000/project")
      .then((res) => {
        const projects = res.data;
        result = projects.filter((proj) => proj.id === Number(this.props.id))[0]
          .name;
      })
      .catch((error) => {
        console.error(error);
      });
    return result;
  }

  async componentDidMount() {
    this.setState({ groups: await this.getGroups() });
    this.setState({ projectName: await this.getProjectName() });
  }

  render() {
    return (
      <div>
        <Navbar renderBool={[true, true, true, false]} create={false} />
        <Container>
          <Row>
            <h3>
              {/* {filteredGroups.length} Groups looking for members in:  */}
              {this.state.projectName}
            </h3>
          </Row>
          <Row>
            <LinkContainer to={`/createGroup/${this.props.id}`}>
              <Button>Advertise my group!</Button>
            </LinkContainer>
          </Row>
          <Row>
            {/* <Col>
              {hackathonReqs.map((req) => (
                <Filter
                  requirementName={req}
                  requirementsList={getAllReqVars(req)}
                  filterFunction={filterGroupsOnReq}
                  resetFunction={deleteFilter}
                />
              ))}
            </Col> */}
            <Col>
              {this.state.groups.map((group) => (
                <Group group={group} key={group.id} />
              ))}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

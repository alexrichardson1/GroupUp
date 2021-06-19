import React, { Component } from "react";
import axios from "axios";
import "components/styles.css";
import { config } from "Constants";
import {
  Form,
  Button,
  InputGroup,
  FormControl,
  Container,
  Col,
} from "react-bootstrap";
import { withRouter } from "react-router-dom";
import NavBar from "components/NavBar";
import { UserContext } from "components/auth/UserContext";

async function addGroup(data) {
  var result = {};
  await axios
    .post(`${config.API_URL}/group/add`, data)
    .then((res) => {
      const group = res.data;
      result = group;
    })
    .catch((error) => {
      console.log(error);
    });
  return result;
}

class CreateGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leaderName: "",
      leaderEmail: "",
      maxmembers: 4,
      teammates: "",
      requirementNames: [],
      adrequirements: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static contextType = UserContext;

  getProject = async () => {
    var result = [];
    await axios
      .post(`${config.API_URL}/project/one`, {
        projectid: this.props.id,
      })
      .then((res) => {
        const project = res.data;
        result = project;
      })
      .catch((error) => {
        console.log(error);
      });
    return result;
  };

  async componentDidMount() {
    const proj = await this.getProject();
    this.setState({ requirementNames: proj.requirements });
    document.title = "Create a listing!";
    let value = this.context;
    console.log(value);
    this.setState({ leaderName: value.value });
    this.setState({ leaderEmail: value.email });
  }

  /* Functions to handle form submission */
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;

    this.setState({
      [target.name]: value,
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const requirementValues = [];
    this.state.requirementNames.map((req) =>
      requirementValues.push(this.state[req])
    );
    const info = {
      leader: this.state.leaderName,
      maxmembers: this.state.maxmembers,
      teammates: this.state.teammates.split(", "),
      requirements: requirementValues,
      adrequirements: this.state.adrequirements,
      projectid: this.props.id,
      leaderemail: this.state.leaderEmail,
      posted: new Date().toISOString(),
    };
    console.log(info);
    await addGroup(info);
    // window.location.reload();
  };

  uniqueComponent = (name) => {
    return (
      <InputGroup className="mb-3" key={name}>
        <InputGroup.Prepend>
          <InputGroup.Text id={name}>{name}</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          name={name}
          value={this.state[name]}
          onChange={this.handleInputChange}
        ></FormControl>
      </InputGroup>
    );
  };

  reqsToComponents = (names) => {
    const components = [];
    names.forEach((req) => {
      components.push(this.uniqueComponent(req));
    });
    return components;
  };

  setUser = (value) => {
    this.setState({ user: value });
  };

  render() {
    return (
      <Container>
        <NavBar
          renderBool={[true, true, true, true]}
          create={true}
          id={this.props.id}
        />
        <h1>Advertise your group</h1>
        <Form onSubmit={this.handleSubmit}>
          <Col>
            <Form.Group
              className="formBox"
              as={Col}
              controlId="formLeaderName"
              key="formLeaderName"
            >
              <Form.Label>Leader's Name</Form.Label>
              <Form.Control
                disabled
                type="text"
                placeholder={this.state.leaderName}
                name="leaderName"
                value={this.state.leaderName}
                // onChange={this.handleInputChange}
              />
              <Form.Text className="text-muted">
                Leader is just the point of contact, it can really be any group
                member.
              </Form.Text>
            </Form.Group>
            <Form.Group
              className="formBox"
              as={Col}
              controlId="formLeaderName"
              key="formLeaderName"
            >
              <Form.Label>Leader's Email</Form.Label>
              <Form.Control
                disabled
                type="text"
                placeholder={this.state.leaderEmail}
                name="leaderEmail"
                value={this.state.leaderEmail}
              />
              <Form.Text className="text-muted">
                This is the first point of contact for new members, make sure
                you are active on this email!
              </Form.Text>
            </Form.Group>
          </Col>

          <label htmlFor="basic-url" className="formBox" key="labelllll">
            A few things you need to specify about your group:
          </label>

          {this.reqsToComponents(this.state.requirementNames).map((req) => {
            return req;
          })}

          <Form.Row>
            <Form.Group controlId="adrequirements" key="adrequirements">
              <Form.Label>Other Requirements/Additional Notes</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g. Experience in Robotics"
                name="adrequirements"
                value={this.state.adrequirements}
                onChange={this.handleInputChange}
              />
              <Form.Text className="text-muted">
                Any of your own requirements.
              </Form.Text>
            </Form.Group>
          </Form.Row>

          <Form.Group
            className="formBox"
            controlId="formOtherMembers"
            key="formOtherMembers"
          >
            <Form.Label>Other Members names (Optional)</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g. John, Mary, Adam"
              name="teammates"
              value={this.state.teammates}
              onChange={this.handleInputChange}
            />
            <Form.Text className="text-muted">
              Add Teammates here (comma-separated).
            </Form.Text>
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    );
  }
}

export default withRouter(CreateGroup);

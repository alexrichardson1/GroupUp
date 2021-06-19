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
      maxmembers: 0,
      teammates: "",
      requirementNames: [],
      adrequirements: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

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
    console.log("Req values on submit: " + this.state.requirementValues);
    const info = {
      leader: this.state.leaderName,
      maxmembers: this.state.maxmembers,
      teammates: this.state.teammates.split(", "),
      requirements: requirementValues,
      adrequirements: this.state.adrequirements,
      projectid: this.props.id,
    };
    console.log(info);
    await addGroup(info);
    window.location.reload();
  };

  uniqueComponent = (name) => {
    const n = this.state.requirementNames.findIndex((e) => e === name);
    console.log(
      "Generating unique component: " + name + " with index value " + n
    );
    return (
      <InputGroup className="mb-3" key={name}>
        <InputGroup.Prepend>
          <InputGroup.Text id={name}>{name}</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          name={name}
          value={this.state[name]}
          onChange={this.handleInputChange}
        >
          {/* {Object.entries(programmingLanguages).map(([key, val]) => (
            <option>{val}</option>
          ))} */}
        </FormControl>
      </InputGroup>
    );
    // }
  };

  reqsToComponents = (names) => {
    const components = [];
    names.forEach((req) => {
      components.push(this.uniqueComponent(req));
    });
    return components;
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
                type="text"
                placeholder="Name"
                name="leaderName"
                value={this.state.leaderName}
                onChange={this.handleInputChange}
              />
              <Form.Text className="text-muted">
                Leader is just the point of contact, it can really be any group
                member.
              </Form.Text>
            </Form.Group>
          </Col>

          <label htmlFor="basic-url" className="formBox" key="labelllll">
            A few things you need to specify about your group:
          </label>
          {/* {this.state.requirementNames.map((req) => {
            this.uniqueComponent(req);
          })} */}
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
              Optionally add teammates names if you feel it would be meaningful.
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

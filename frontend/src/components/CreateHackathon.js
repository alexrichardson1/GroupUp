import React, { Component } from "react";
import axios from "axios";
import "components/styles.css";
import { config } from "Constants";
import { Form, Button, Container, Col } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import NavBar from "components/NavBar";

async function addProject(data) {
  var result = {};
  await axios
    .post(`${config.API_URL}/project/add`, data)
    .then((res) => {
      const group = res.data;
      result = group;
    })
    .catch((error) => {
      console.log(error);
    });
  return result;
}

class CreateHackathon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hackathonName: "",
      requirements: [],
      description: "",
      hours: "",
      date: "",
      location: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {}

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;

    this.setState({
      [target.name]: value,
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const info = {
      name: this.state.hackathonName,
      requirements: this.state.requirements.split(", "),
      description: this.state.description,
      hours: this.state.hours,
      date: new Date(this.state.date).toISOString(),
      location: this.state.location,
    };
    await addProject(info);
    window.location.reload();
  };

  genFormComponent = (label, placeholder, stateName, mutedText) => {
    return (
      <Form.Group
        className="formBox"
        as={Col}
        controlId="formLeaderName"
        key="formLeaderName"
      >
        <Form.Label>{label}</Form.Label>
        <Form.Control
          type="text"
          placeholder={placeholder}
          name={stateName}
          value={this.state[stateName]}
          onChange={this.handleInputChange}
        />
        <Form.Text className="text-muted">{mutedText}</Form.Text>
      </Form.Group>
    );
  };

  render() {
    return (
      <Container>
        <NavBar
          renderBool={[true, true, true, false]}
          create={true}
          id={this.props.id}
        />
        <h1>Adding your Hackathon to our list</h1>
        <Form onSubmit={this.handleSubmit}>
          {this.genFormComponent(
            "Hackathon Name",
            "e.g. University of Paris Hackathon 2021",
            "hackathonName",
            ""
          )}

          {this.genFormComponent(
            "Filter Requirements",
            "e.g. Programming Language, Timezone [if remote], Version Control",
            "requirements",
            'These are the compulsory requirements that groups advertising for your hackathon must specify. For example, you might want groups to specify "Timezone" when advertising, if your Hackathon is remote.'
          )}

          {this.genFormComponent(
            "Description",
            "e.g. The Annual Hackathon event for University of Paris, where you will be creating a web-based game!",
            "description",
            "Include a little bit about your hackathon, to make sure users are on the right page."
          )}

          {this.genFormComponent(
            "Hours",
            "24",
            "hours",
            "The length of your hackathon as number of hours."
          )}

          <Form.Group
            className="formBox"
            as={Col}
            controlId="formLeaderName"
            key="formLeaderName"
          >
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              placeholder="dfsd"
              name="date"
              value={this.state.date}
              onChange={this.handleInputChange}
            />
          </Form.Group>

          {this.genFormComponent(
            "Location",
            "e.g. Paris, France",
            "location",
            ""
          )}

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    );
  }
}

export default withRouter(CreateHackathon);

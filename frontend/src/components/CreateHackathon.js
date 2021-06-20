import React, { Component } from "react";
import axios from "axios";
import "components/styles.css";
import { config } from "Constants";
import { Form, Button, Container, Col, Alert, Spinner } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import NavBar from "components/NavBar";
import { Redirect } from "react-router";

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
      invalid: false,
      invalid2: false,
      redirect: false,
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
    if (
      this.state.hackathonName === "" ||
      this.state.requirements.length === 0 ||
      this.state.description === "" ||
      this.state.hours === "" ||
      isNaN(parseInt(this.state.hours)) ||
      this.state.date === "" ||
      this.state.location === ""
    ) {
      this.setState({ invalid: true });
    } else {
      const info = {
        name: this.state.hackathonName,
        requirements: this.state.requirements.split(", "),
        description: this.state.description,
        hours: this.state.hours,
        date: new Date(this.state.date).toISOString(),
        location: this.state.location,
      };
      await addProject(info);
      this.setState({ invalid: false });
      this.id = setTimeout(() => this.setState({ redirect: true }), 3000);
      this.setState({ invalid2: true });
    }
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
          isInvalid={this.state[stateName].length === 0}
        />
        <Form.Text className="text-muted">{mutedText}</Form.Text>
      </Form.Group>
    );
  };

  render() {
    return this.state.redirect ? (
      <Redirect to="/home" />
    ) : (
      <Container>
        <NavBar
          renderBool={[true, true, true, false]}
          create={true}
          hackathon={true}
          id={this.props.id}
        />
        <h1>Adding your Hackathon to our list</h1>
        {this.state.invalid === true ? (
          <Alert variant="danger">Fill in all fields.</Alert>
        ) : (
          <h9></h9>
        )}
        {this.state.invalid2 === true ? (
          <Alert variant="success">Hackathon is now available!</Alert>
        ) : (
          <h9></h9>
        )}
        {this.state.invalid2 === false ? (
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

            <Form.Group
              className="formBox"
              as={Col}
              controlId="formLeaderName"
              key="formLeaderName"
            >
              <Form.Label>Length of Hackathon (Hours)</Form.Label>
              <Form.Control
                type="number"
                placeholder="24"
                name="hours"
                value={this.state.hours}
                onChange={this.handleInputChange}
                isInvalid={this.state.hours.length === 0}
              />
            </Form.Group>

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
                isInvalid={this.state.date.length === 0}
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
        ) : (
          <Spinner animation="grow" />
        )}
      </Container>
    );
  }
}

export default withRouter(CreateHackathon);

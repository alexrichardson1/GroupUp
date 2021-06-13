import React, { Component } from "react";
import axios from "axios";
import "components/styles.css";
import { Form, Button, InputGroup, FormControl } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import NavBar from "components/NavBar";
// import { useHistory } from "react-router-dom";

async function addGroup(data) {
  var result = {};
  await axios
    .post(`http://localhost:5000/group/add`, data)
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
      leader: "",
      maxmembers: 0,
      teammates: "",
      timezone: "",
      language: "",
      nationality: "",
      adrequirements: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    const info = {
      leader: this.state.leader,
      maxmembers: this.state.maxmembers,
      teammates: this.state.teammates.split(", "),
      requirements: [
        this.state.timezone,
        this.state.language,
        this.state.nationality,
      ],
      adrequirements: this.state.adrequirements,
      projectid: this.props.id,
    };
    console.log(info);
    await addGroup(info);
    window.location.reload();
  };

  // history = useHistory();

  render() {
    return (
      <div>
        <NavBar
          renderBool={[true, true, true, true]}
          create={true}
          id={this.props.id}
        />
        <h1>Create your group</h1>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="formLeaderName">
            <Form.Label>Leader's Full Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Leader's Full Name"
              name="leader"
              value={this.state.leader}
              onChange={this.handleInputChange}
            />
            <Form.Text className="text-muted">
              This can really be any one of your names, it's just the name your
              group will be advertised under.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formOtherMembers">
            <Form.Label>Other Members</Form.Label>
            <Form.Control
              type="text"
              placeholder="All other members go here"
              name="teammates"
              value={this.state.teammates}
              onChange={this.handleInputChange}
            />
          </Form.Group>

          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">Timezone</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="e.g. +5 = GMT+5"
              aria-label="Username"
              aria-describedby="basic-addon1"
              name="timezone"
              value={this.state.timezone}
              onChange={this.handleInputChange}
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">
                Programming Language
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="e.g. Java"
              aria-label="Username"
              aria-describedby="basic-addon1"
              name="language"
              value={this.state.language}
              onChange={this.handleInputChange}
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">Nationality</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="e.g. United Kingdom"
              aria-label="Username"
              aria-describedby="basic-addon1"
              name="nationality"
              value={this.state.nationality}
              onChange={this.handleInputChange}
            />
          </InputGroup>

          <Form.Group controlId="formOtherMembers">
            <Form.Label>Other Requirements</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              name="adrequirements"
              value={this.state.adrequirements}
              onChange={this.handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formMembersNeeded">
            <Form.Label>Members needed</Form.Label>
            <Form.Control
              as="select"
              custom
              name="maxmembers"
              value={this.state.maxmembers}
              onChange={this.handleInputChange}
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Form.Control>
          </Form.Group>
          {/* <LinkContainer to="/listing//">
          <Button>Go Back</Button>
        </LinkContainer> */}
          {/* <Button onClick={() => history.goBack()}>Go Back</Button> */}
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default withRouter(CreateGroup);

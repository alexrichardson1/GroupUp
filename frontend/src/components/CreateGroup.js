import React, { Component } from "react";
import axios from "axios";
import "components/styles.css";
import {
  Form,
  Button,
  InputGroup,
  FormControl,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { withRouter } from "react-router-dom";
import NavBar from "components/NavBar";
import nationalities from "data/nationalities";
import programmingLanguages from "data/programming";
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
      leaderFirstName: "",
      leaderLastName: "",
      maxmembers: 0,
      teammates: "",
      timezone: "",
      language: "",
      nationality: "",
      adrequirements: "",
      membersNeeded: 0,
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
          <Row>
            <Col>
              <Form.Group
                className="formBox"
                as={Col}
                controlId="formLeaderName"
              >
                <Form.Label>Leader's First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="First Name"
                  name="leaderFirstName"
                  value={this.state.leaderFirstName}
                  onChange={this.handleInputChange}
                />
                <Form.Text className="text-muted">
                  Leader is just the point of contact.
                </Form.Text>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group
                className="formBox"
                as={Col}
                controlId="formLeaderName"
              >
                <Form.Label>Leader's Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Last Name"
                  name="leaderLastName"
                  value={this.state.leaderLastName}
                  onChange={this.handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <label htmlFor="basic-url" className="formBox">
            A few things you need to specify:
          </label>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">Timezone</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              as="select"
              custom
              name="languages"
              value={this.state.timezone}
              onChange={this.handleInputChange}
            >
              <option>+1</option>
            </FormControl>
          </InputGroup>

          <Form.Row>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">
                  Programming Language
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                as="select"
                custom
                name="languages"
                value={this.state.language}
                onChange={this.handleInputChange}
              >
                {Object.entries(programmingLanguages).map(([key, val]) => (
                  <option>{val}</option>
                ))}
              </FormControl>
            </InputGroup>
          </Form.Row>

          <Form.Row>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">Nationality</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Group>
                <FormControl
                  as="select"
                  custom
                  name="nationality"
                  value={this.state.nationality}
                  onChange={this.handleInputChange}
                >
                  {Object.entries(nationalities).map(([key, val]) => (
                    <option>{val}</option>
                  ))}
                </FormControl>
              </Form.Group>
            </InputGroup>
          </Form.Row>

          <Form.Row>
            <Form.Group controlId="formOtherMembers">
              <Form.Label>Other Requirements</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                name="adrequirements"
                value={this.state.adrequirements}
                onChange={this.handleInputChange}
              />
              <Form.Text className="text-muted">
                Any of your own requirements.
              </Form.Text>
            </Form.Group>
          </Form.Row>

          <Form.Group className="formBox">
            <Form.Label>Members needed: </Form.Label>
            <Form.Check
              inline
              label="1"
              name="group1"
              type="radio"
              value={1}
              id={`inline-radio-1`}
              onChange={(e) => this.setState({ val: e.target.value })}
            />
            <Form.Check
              inline
              label="2"
              name="group1"
              type="radio"
              value={2}
              id={`inline-radio-2`}
              onChange={(e) => this.setState({ val: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="formBox" controlId="formOtherMembers">
            <Form.Label>Other Members names</Form.Label>
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

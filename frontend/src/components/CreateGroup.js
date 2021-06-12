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
  onSubmit = async (event) => {
    event.preventDefault();
    const title = this.title.value;
    const tags = this.tags.value;
    const info = { title: title, tags: [tags] };
    this.goBack = this.goBack.bind(this);
    await addGroup(info);
    window.location.reload();
  };

  render() {
    //let history = useHistory();
    return (
      <div>
        <NavBar renderBool={[true, true, true, true]} create={true} />
        <h1>Create your group</h1>
        <Form>
          <Form.Group controlId="formLeaderName">
            <Form.Label>Leader's Full Name</Form.Label>
            <Form.Control type="text" placeholder="Leader's Full Name" />
            <Form.Text className="text-muted">
              This can really be any one of your names, it's just the name your
              group will be advertised under.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formOtherMembers">
            <Form.Label>Other Members</Form.Label>
            <Form.Control type="text" placeholder="All other members go here" />
          </Form.Group>

          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">Timezone</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="e.g. +5 = GMT+5"
              aria-label="Username"
              aria-describedby="basic-addon1"
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
            />
          </InputGroup>

          <Form.Group controlId="formOtherMembers">
            <Form.Label>Other Requirements</Form.Label>
            <Form.Control type="text" placeholder="" />
          </Form.Group>

          <Form.Group controlId="formMembersNeeded">
            <Form.Label>Members needed</Form.Label>
            <Form.Control as="select" custom>
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
          <Button onClick={() => this.props.history.goBack()}>Go Back</Button>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default withRouter(CreateGroup);

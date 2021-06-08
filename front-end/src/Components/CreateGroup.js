<<<<<<< HEAD
import React, { Component } from "react";
import axios from "axios";
import "./styles.css";
import { Form, Button, InputGroup, FormControl } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

async function addGroup(data) {
  var result = {};
  await axios
    .post(`"http://localhost:5000/group/add`, data)
    .then((res) => {
      const group = res.data;
      console.log(group);
      result = group;
    })
    .catch((error) => {
      console.log(error);
    });
  return result;
}

export default class CreateGroup extends Component {
  onSubmit = async (event) => {
    event.preventDefault();
    const title = this.title.value;
    const tags = this.tags.value;
    const info = { title: title, tags: [tags] };
    await addGroup(info);
    window.location.reload();
  };
=======
import { Form, Button, InputGroup, FormControl } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const CreateGroup = () => {
  let history = useHistory();

  return (
    <div>
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
>>>>>>> 68c89e315e00af3e3342c1a8b45f61dc3feae2d4

  render() {
    return (
      <div>
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

<<<<<<< HEAD
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
=======
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
>>>>>>> 68c89e315e00af3e3342c1a8b45f61dc3feae2d4

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

<<<<<<< HEAD
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
          <LinkContainer to="/listings">
            <Button>Go Back</Button>
          </LinkContainer>
          <Button variant="primary" type="submit" onSubmit={this.onSubmit}>
            Submit
          </Button>
        </Form>
      </div>
      // <div className="formWrap">
      //   <div className="formContent">
      //     <form className="form" onSubmit={this.onSubmit}>
      //       <h1 className="formH1">Enter Session Details</h1>
      //       <input
      //         type="text"
      //         className="formInput"
      //         placeholder="Title"
      //         ref={(input) => (this.title = input)}
      //       />
      //       <input
      //         type="text"
      //         className="formInput"
      //         placeholder="Tags"
      //         ref={(input) => (this.tags = input)}
      //       />
      //       <button className="createButton">Create Session</button>
      //     </form>
      //   </div>
      // </div>
    );
  }
}
=======
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
        <Button onClick={() => history.goBack()}>Go Back</Button>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default CreateGroup;
>>>>>>> 68c89e315e00af3e3342c1a8b45f61dc3feae2d4

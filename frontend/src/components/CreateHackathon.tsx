import { Component } from "react";
import "components/styles.css";
import { Form, Button, Container, Col, Alert, Spinner } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import NavBar from "components/NavBar";
import { Redirect } from "react-router";
import { ProjectT } from "types/types";
import { addProject } from "common/api";
import { allFieldsNotFilledIn } from "common/render";

interface Props {
  id: number;
}

interface State {
  hackathonName: string;
  requirements: string;
  description: string;
  hours: string;
  date: string;
  location: string;
  invalid: boolean;
  invalid2: boolean;
  redirect: boolean;
}

class CreateHackathon extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hackathonName: "",
      requirements: "",
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

  override async componentDidMount() {}

  handleInputChange(event: any) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;

    //@ts-ignore
    this.setState({
      [target.name]: value,
    });
  }

  handleSubmit = async (e: any) => {
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
      const info: ProjectT = {
        name: this.state.hackathonName,
        requirements: this.state.requirements.split(", "),
        description: this.state.description,
        hours: parseInt(this.state.hours),
        date: new Date(this.state.date).toISOString(),
        location: this.state.location,
      };
      await addProject(info);
      this.setState({ invalid: false });
      const TIMEOUT = 3000;
      //@ts-ignore
      this.id = setTimeout(() => this.setState({ redirect: true }), TIMEOUT);
      this.setState({ invalid2: true });
    }
  };

  genFormComponent = (
    label: string,
    placeholder: string,
    stateName: string,
    mutedText: string
  ) => {
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
          //@ts-ignore
          value={this.state[stateName]}
          onChange={this.handleInputChange}
          //@ts-ignore
          isInvalid={this.state[stateName].length === 0}
        />
        <Form.Text className="text-muted">{mutedText}</Form.Text>
      </Form.Group>
    );
  };

  hackathonNowAvailable() {
    if (this.state.invalid2) {
      return <Alert variant="success">Hackathon is now available!</Alert>;
    }
    return null;
  }

  override render() {
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
        {allFieldsNotFilledIn(this.state.invalid)}
        {this.hackathonNowAvailable()}
        {!this.state.invalid2 ? (
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

//@ts-ignore
export default withRouter(CreateHackathon);

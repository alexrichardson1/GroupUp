import { ChangeEvent, Component } from "react";
import "components/styles.css";
import {
  Form,
  Button,
  InputGroup,
  FormControl,
  Container,
  Col,
  Alert,
  Spinner,
} from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { Redirect } from "react-router";
import NavBar from "components/NavBar";
import { UserContext } from "components/auth/UserContext";
import { allFieldsNotFilledIn } from "common/render";
import { addGroup, getActive, getProject } from "common/api";

interface Props {
  id: number;
}

interface State {
  leader: string;
  maxmembers: number;
  teammates: string;
  requirements: string[];
  adrequirements: string;
  leaderemail: string;
  invalid: boolean;
  invalid2: boolean;
  redirect: boolean;
}

class CreateGroup extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      leader: "",
      leaderemail: "",
      maxmembers: 4,
      teammates: "",
      requirements: [],
      adrequirements: "",
      invalid: false,
      invalid2: false,
      redirect: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static override contextType = UserContext;

  override async componentDidMount() {
    const { email, fullname } = await getActive();
    this.setState({ leaderemail: email });
    this.setState({ leader: fullname });
    const proj = await getProject(this.props.id);
    this.setState({ requirements: proj.requirements });
    document.title = "Create a listing!";
  }

  /* Functions to handle form submission */
  handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;

    //@ts-ignore
    this.setState({
      [target.name]: value,
    });
  }

  override componentWillUnmount() {
    //@ts-ignore
    clearTimeout(this.idss);
  }

  handleSubmit = async (e: any) => {
    let submit = true;
    this.state.requirements.forEach((req) => {
      // @ts-ignore
      if (this.state[req] === "" || this.state[req] === undefined) {
        submit = false;
      }
    });
    e.preventDefault();
    if (submit) {
      const requirementValues: string[] = [];
      this.state.requirements.map((req) =>
        //@ts-ignore
        requirementValues.push(this.state[req])
      );
      const info = {
        leader: this.state.leader,
        maxmembers: this.state.maxmembers,
        teammates: this.state.teammates.split(", "),
        requirements: requirementValues,
        adrequirements: this.state.adrequirements,
        projectid: this.props.id,
        leaderemail: this.state.leaderemail,
        posted: new Date().toISOString(),
      };
      console.log(info);
      await addGroup(info);
      this.setState({ invalid: false });
      const TIMEOUT = 3000;
      //@ts-ignore
      this.id = setTimeout(() => this.setState({ redirect: true }), TIMEOUT);
      this.setState({ invalid2: true });
    } else {
      this.setState({ invalid: true });
    }
  };

  uniqueComponent = (name: string) => {
    return (
      <InputGroup className="mb-3" key={name}>
        <InputGroup.Prepend>
          <InputGroup.Text id={name}>{name}</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          name={name}
          //@ts-ignore
          value={this.state[name]}
          onChange={this.handleInputChange}
          //@ts-ignore
          isInvalid={!(this.state[name] && this.state[name].length !== 0)}
        ></FormControl>
      </InputGroup>
    );
  };

  reqsToComponents = (names: string[]) => {
    const components: JSX.Element[] = [];
    names.forEach((req) => {
      components.push(this.uniqueComponent(req));
    });
    return components;
  };

  groupAdvertised() {
    if (this.state.invalid2) {
      return <Alert variant="success">Group advertised!</Alert>;
    }
    return null;
  }

  override render() {
    return this.state.redirect ? (
      <Redirect to="/home" />
    ) : (
      <Container>
        <NavBar
          renderBool={[true, true, true, true]}
          create={true}
          id={this.props.id}
        />
        <h1>Advertise your group</h1>
        {allFieldsNotFilledIn(this.state.invalid)}
        {this.groupAdvertised()}
        {!this.state.invalid2 ? (
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
                  placeholder={this.state.leader}
                  name="leader"
                  value={this.state.leader}
                  // onChange={this.handleInputChange}
                />
                <Form.Text className="text-muted">
                  Leader is just the point of contact, it can really be any
                  group member.
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
                  placeholder={this.state.leaderemail}
                  name="leaderemail"
                  value={this.state.leaderemail}
                />
                <Form.Text className="text-muted">
                  This is the first point of contact for new members, make sure
                  you are active on this email!
                </Form.Text>
              </Form.Group>
            </Col>

            <label htmlFor="basic-url" className="formBox" key="labelllll">
              A few things you need to specify about your group, to help
              understand the skills, interests and backgrounds your group
              possess:
            </label>

            {this.reqsToComponents(this.state.requirements).map((req) => {
              return req;
            })}

            <Form.Row>
              <Form.Group controlId="adrequirements" key="adrequirements">
                <Form.Label>Additional Notes</Form.Label>
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
              <Form.Label>Other Members names</Form.Label>
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
        ) : (
          <Spinner animation="grow" />
        )}
      </Container>
    );
  }
}

//@ts-ignore
export default withRouter(CreateGroup);

import { LinkContainer } from "react-router-bootstrap";
import { Button, Jumbotron, Card, ListGroup } from "react-bootstrap";
import NavBar from "components/NavBar";
import axios from "axios";
import { config } from "Constants";
// import { useState, useEffect, useContext } from "react";
import { UserContext } from "components/auth/UserContext";
import { Component } from "react";
import { getSuggestedQuery } from "@testing-library/react";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      filteredGroups: "",
      users: [],
    };
  }

  // name is value
  filterGroupsOnName = (name) => {
    return this.state.groups.filter(
      (group) =>
        group.leader === name ||
        group.teammates.some((member) => member === name)
    );
  };

  async componentDidMount() {
    this.setState({ groups: await this.getGroups() });
    this.setState({ filteredGroups: await this.getGroups() });
    this.setState({ users: await this.getAllUsers() });
  }

  async getGroups() {
    let result = "";
    await axios
      .get(`${config.API_URL}/group/`)
      .then((res) => {
        const group = res.data;
        result = group;
      })
      .catch((error) => {
        console.error(error);
      });

    return result;
  }

  async getAllUsers() {
    var result = [];
    await axios
      .get(`${config.API_URL}/user/`)
      .then((res) => {
        const projects = res.data;
        result = projects;
      })
      .catch((error) => {
        console.error(error);
      });
    return result;
  }

  getPersonalisedGroups = (email) => {
    console.log(this.state.users);
    // const filters = user.filters;
    // console.log("filters: ");
    // console.log(filters);
    /*const filtered = filteredGroups().filter((gr) =>
      gr.requirements.includes()
    );*/
    // return filtered;
  };

  personalFilters = () => {
    // {
    //   filteredGroups.map((group) => (
    //     <Group
    //       group={group}
    //       requirementNames={this.state.requirements}
    //       key={group.id}
    //     />
    //   ));
    // }
  };

  render() {
    return (
      <UserContext.Consumer>
        {({ email, value }) => (
          <div>
            <NavBar renderBool={[true, false, false, false]} create={false} />
            <Button onClick={() => this.getPersonalisedGroups(email)}>
              sdsd
            </Button>
            <Jumbotron>
              <h1 className="title">Welcome to GroupUp</h1>
              <div>
                An easy tool for helping you find a group for your next
                Hackathon!
              </div>
              <LinkContainer to="/selection">
                <Button>Get Started</Button>
              </LinkContainer>
              <h3 className="groupsHome">Groups you're already in.</h3>
              <div>
                {/*  {filterGroupsOnName().map((group) => (
            
           ))} */}
              </div>
              <div>
                {this.filterGroupsOnName(value).map((group) => (
                  <Card.Body>
                    <Card.Title>{group.leader}'s Group</Card.Title>
                    <Card.Text>
                      <ListGroup.Item variant="dark">
                        Other Members:
                      </ListGroup.Item>
                      {group.teammates.map((teammate) => (
                        <ListGroup.Item variant="flush">
                          {teammate}
                        </ListGroup.Item>
                      ))}
                    </Card.Text>
                    <LinkContainer to={`/group/${group.id}`}>
                      <Button>More Info</Button>
                    </LinkContainer>
                  </Card.Body>
                ))}
              </div>
            </Jumbotron>
          </div>
        )}
      </UserContext.Consumer>
    );
  }
}

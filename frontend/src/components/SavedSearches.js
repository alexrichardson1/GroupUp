import NavBar from "components/NavBar";
import axios from "axios";
import { config } from "Constants";
import { UserContext } from "components/auth/UserContext";
import { Component } from "react";
import Group from "components/Group";

export default class SavedSearches extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredGroups: [],
      users: [],
      projects: [],
    };
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

  async getProjects() {
    var result = [];
    await axios
      .get(`${config.API_URL}/project`)
      .then((res) => {
        const projects = res.data;
        result = projects;
      })
      .catch((error) => {
        console.log(error);
      });
    return result;
  }

  async componentDidMount() {
    this.setState({ groups: await this.getGroups() });
    this.setState({ filteredGroups: await this.getGroups() });
    this.setState({ users: await this.getAllUsers() });
    this.setState({ projects: await this.getProjects() });
  }

  getProjectRequirementsById = (id) => {
    // if (this.state.projects.length !== 0) {
    //   return this.state.projects.map((proj) => proj.id === id)[0].requirements;
    // } else {
    return ["Timezone", "Code Language", "Spoken Language"];
    // }
  };

  getPersonalisedGroups = (email) => {
    const user = this.state.users.filter((u) => u.email === email);

    const activeFilters = user[0].activefilter;
    let newFilteredGroups = [];
    activeFilters.forEach((v) => {
      if (v === "Any") {
        // ignore
      } else {
        for (let i = 0; i < this.state.filteredGroups.length; i++) {
          if (this.state.filteredGroups[i].requirements.includes(v)) {
            newFilteredGroups.push(this.state.filteredGroups[i]);
          }
        }
      }
      // eslint-disable-next-line
      this.state.filteredGroups = newFilteredGroups;
      this.setState({ ...this.state });
    });
  };

  render() {
    return (
      <UserContext.Consumer>
        {({ email, value }) => (
          <div>
            <NavBar
              renderBool={[true, false, false, false]}
              create={false}
              savedSearches={true}
            />
            <h3 className="groupsHome">Your personalised search results.</h3>
            <h6 className="text-muted">Filters: JavaScript, C++</h6>
            <div>
              {/* <Button onClick={() => this.getPersonalisedGroups(email)}>
                  Show
                </Button> */}
              {this.state.filteredGroups.map((group) => (
                <Group
                  group={group}
                  requirementNames={this.getProjectRequirementsById(
                    group.projectid
                  )}
                  key={group.id}
                />
              ))}
            </div>
          </div>
        )}
      </UserContext.Consumer>
    );
  }
}

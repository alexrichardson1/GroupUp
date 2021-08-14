import NavBar from "components/NavBar";
import axios from "axios";
import { config } from "Constants";
import { Component } from "react";
import Group from "components/Group";
import { GroupT, ProjectT, UserT } from "types/types";

interface Props {}

interface State {
  filteredGroups: GroupT[];
  users: UserT[];
  projects: ProjectT[];
}

export default class SavedSearches extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      filteredGroups: [],
      users: [],
      projects: [],
    };
  }

  async getGroups(): Promise<GroupT[]> {
    var result: GroupT[] = [];
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

  async getAllUsers(): Promise<UserT[]> {
    var result: UserT[] = [];
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

  async getProjects(): Promise<ProjectT[]> {
    var result: ProjectT[] = [];
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

  override async componentDidMount() {
    // this.setState({ groups: await this.getGroups() });
    this.setState({ filteredGroups: await this.getGroups() });
    this.setState({ users: await this.getAllUsers() });
    this.setState({ projects: await this.getProjects() });
  }

  getPersonalisedGroups = (email: string) => {
    const user = this.state.users.filter((u) => u.email === email);
    if (!user[0]) {
      console.log("No user found");
      return;
    }
    const activeFilters = user[0].activefilter;
    let newFilteredGroups: GroupT[] = [];
    activeFilters.forEach((v) => {
      if (v !== "Any") {
        var group: GroupT | undefined;
        for (let i = 0; i < this.state.filteredGroups.length; i++) {
          group = this.state.filteredGroups[i];
          if (group && group.requirements.includes(v)) {
            newFilteredGroups.push(group);
          }
        }
      }
      //@ts-ignore
      this.state.filteredGroups = newFilteredGroups;
      this.setState({ ...this.state });
    });
  };

  override render() {
    return (
      <div>
        <NavBar
          renderBool={[true, false, false, false]}
          create={false}
          savedSearches={true}
        />
        <h3 className="groupsHome">Your personalised search results.</h3>
        <h6 className="text-muted">Filters: JavaScript, C++</h6>
        <div>
          {this.state.filteredGroups.map((group) => (
            <Group
              group={group}
              requirementNames={[
                "Timezone",
                "Code Language",
                "Spoken Language",
              ]}
              projectId={group.projectid}
              key={group.id}
            />
          ))}
        </div>
      </div>
    );
  }
}

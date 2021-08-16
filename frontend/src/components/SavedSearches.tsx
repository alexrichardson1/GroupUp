import NavBar from "components/NavBar";
import { Component } from "react";
import Group from "components/Group";
import { GroupT, ProjectT, UserT } from "types/types";
import { getGroups, getProjects, getUsers } from "common/api";

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

  override async componentDidMount() {
    this.setState({ filteredGroups: await getGroups() });
    this.setState({ users: await getUsers() });
    this.setState({ projects: await getProjects() });
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
      // eslint-disable-next-line react/no-direct-mutation-state
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

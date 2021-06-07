import Group from "./Group";
import { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

async function getGroups() {
  var result = [];
  await axios
    .get("http://localhost:5000/group")
    .then((res) => {
      const groups = res.data;
      console.log(groups);
      result = groups;
    })
    .catch((error) => {
      console.log(error);
    });
  return result;
}

export default class Groups extends Component {
  constructor(props) {
    super(props);
    this.state = { groups: [] };
  }

  async componentDidMount() {
    this.setState({ groups: await getGroups() });
  }

  render() {
    return (
      <div>
        <h3>2 Groups looking for members in Project X</h3>
        <Link to="/createGroup">
          <button className="btn">Advertise my group!</button>
        </Link>
        {this.state.groups.map((group) => (
          <Group group={group} key={group.id} />
        ))}
      </div>
    );
  }
}

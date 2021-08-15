import { GroupT, ProjectT, UserT } from "types/types";
import axios from "axios";
import { config } from "Constants";

const dummyGroup: GroupT = {
  id: -1,
  leader: "LEADER",
  maxmembers: -1,
  teammates: ["ALICE", "BOB"],
  requirements: ["REQUIREMENT"],
  adrequirements: "ADDITIONAL REQUIREMENTS",
  projectid: -1,
  leaderemail: "DUMMY@EMAIL.COM",
  posted: "TIME",
};

const dummyProject: ProjectT = {
  id: -1,
  name: "NAME",
  requirements: ["REQUIREMENT"],
  description: "DESCRIPTION",
  hours: 0,
  date: "DATE",
  location: "LOCATION",
};

const dummyUser: UserT = {
  id: -1,
  fullname: "FULL NAME",
  email: "DUMMY@EMAIL.COM",
  password: "PASSWORD",
  activefilter: ["FILTER"],
  lastlogin: "LAST LOGIN",
  groupsid: -1,
};

async function getGroup(groupId: number) {
  const group = dummyGroup;
  await axios
    .post(`${config.API_URL}/group/one`, {
      groupid: groupId,
    })
    .then((res) => {
      const group = res.data;
      console.log(group);
    })
    .catch((error) => {
      console.error(error);
    });
  return group;
}

async function getGroups() {
  var result: GroupT[] = [];
  await axios
    .get(`${config.API_URL}/group`)
    .then((res) => {
      result = res.data;
    })
    .catch((error) => {
      console.error(error);
    });
  return result;
}

async function getProject(id: number) {
  var result = dummyProject;
  await axios
    .post(`${config.API_URL}/project/one`, {
      projectid: id,
    })
    .then((res) => {
      result = res.data;
    })
    .catch((error) => {
      console.error(error);
    });
  return result;
}

async function getProjects() {
  var result: ProjectT[] = [];
  await axios
    .get(`${config.API_URL}/project`)
    .then((res) => {
      result = res.data;
    })
    .catch((error) => {
      console.error(error);
    });
  return result;
}

async function getUser(email: string) {
  var result = dummyUser;
  await axios
    .post(`${config.API_URL}/user/one`, {
      email: email,
    })
    .then((res) => {
      result = res.data;
    })
    .catch((error) => {
      console.error(error);
    });
  return result;
}

async function getUsers(): Promise<UserT[]> {
  var result: UserT[] = [];
  await axios
    .get(`${config.API_URL}/user`)
    .then((res) => {
      result = res.data;
    })
    .catch((error) => {
      console.error(error);
    });
  return result;
}

export {
  getProject,
  getProjects,
  dummyProject,
  getGroup,
  getGroups,
  dummyGroup,
  getUser,
  getUsers,
  dummyUser,
};

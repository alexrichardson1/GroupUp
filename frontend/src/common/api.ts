import { ActiveT, GroupT, ProjectT, UserT } from "types/types";
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

const dummyActive: ActiveT = {
  id: -1,
  fullname: "FULL NAME",
  email: "DUMMY@EMAIL.COM",
  filters: [],
};

async function addGroup(data: GroupT) {
  await axios
    .post(`${config.API_URL}/group/add`, data)
    .then((res) => {
      console.log(`Group added: ${res.data}`);
    })
    .catch((error) => {
      console.error(error);
    });
}

async function joinGroup(groupId: number, name: string) {
  await axios
    .post(`${config.API_URL}/group/join`, {
      groupid: groupId,
      name: name,
    })
    .then((res) => {
      console.log(`Group joined: ${res.data}`);
      alert("Successfully joined group!");
    })
    .catch((error) => {
      console.error(error);
    });
}

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
  var result: GroupT[] = [dummyGroup];
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

async function addProject(data: ProjectT) {
  await axios
    .post(`${config.API_URL}/project/add`, data)
    .then((res) => {
      console.log(`Project added: ${res.data}`);
    })
    .catch((error) => {
      console.error(error);
    });
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
  var result: ProjectT[] = [dummyProject];
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

async function getUsers() {
  var result: UserT[] = [dummyUser];
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

async function getActive() {
  var result = dummyActive;
  await axios
    .get(`${config.API_URL}/active/one`)
    .then((res) => {
      result = res.data;
    })
    .catch((error) => {
      console.error(error);
    });
  return result;
}

async function setActive(email: string, fullName: string) {
  await axios
    .post(`${config.API_URL}/active/email/update`, {
      email: email,
      fullname: fullName,
    })
    .then((res) => {
      console.log(`Updated active: ${res.data}`);
    })
    .catch((error) => {
      console.error(error);
    });
}

async function setFilters(userEmail: string, filters: any[]) {
  await axios
    .post(`${config.API_URL}/user/activefilter/update`, {
      filters: filters,
      email: userEmail,
    })
    .then((res) => {
      console.log(`Added filters for: ${userEmail}`);
      console.log(`Filters: ${filters}`);
      console.log(`Updated active: ${res.data}`);
    })
    .catch((error) => {
      console.error(error);
    });
}

export {
  addProject,
  getProject,
  getProjects,
  dummyProject,
  addGroup,
  joinGroup,
  getGroup,
  getGroups,
  dummyGroup,
  getUser,
  getUsers,
  dummyUser,
  getActive,
  setActive,
  setFilters,
  dummyActive,
};

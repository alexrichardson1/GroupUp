import { ActiveT, GroupT, ProjectT, UserT } from "types/types";
import axios from "axios";
import { config } from "common/config";

// group
const DUMMY_ID = 0;
const LEADER = "ALICE";
const MAX_MEMBERS = 2;
const TEAMMATES = ["BOB", "CAROL"];
const GROUP_REQUIREMENTS = ["TYPESCRIPT", "REACT"];
const ADDITIONAL_REQUIREMENTS = "FRONTEND DEVELOPER";
const LEADER_EMAIL = "ALICE@EMAIL.COM";
const TIME_POSTED = "20:00";

// project
const PROJECT_NAME = "IC HACK X";
const PROJECT_REQUIREMENTS = ["DEVELOP A GAME", "HAVE FUN"];
const DESCRIPTION = "WE'VE GOT PIZZA!";
const HOURS = 12;
const DATE = "20-4-22";
const LOCATION = "LONDON";

// user
const FULL_NAME = "ALICE PLEASANCE HARGEAVES";
const PASSWORD = "********";
const LAST_LOGIN = "16-05-21";

// active
const FILTERS = ["FILTER #1"];

const dummyGroup: GroupT = {
  id: DUMMY_ID,
  leader: LEADER,
  maxmembers: MAX_MEMBERS,
  teammates: TEAMMATES,
  requirements: GROUP_REQUIREMENTS,
  adrequirements: ADDITIONAL_REQUIREMENTS,
  projectid: DUMMY_ID,
  leaderemail: LEADER_EMAIL,
  posted: TIME_POSTED,
};

const dummyProject: ProjectT = {
  id: DUMMY_ID,
  name: PROJECT_NAME,
  requirements: PROJECT_REQUIREMENTS,
  description: DESCRIPTION,
  hours: HOURS,
  date: DATE,
  location: LOCATION,
};

const dummyUser: UserT = {
  id: DUMMY_ID,
  fullname: FULL_NAME,
  email: LEADER_EMAIL,
  password: PASSWORD,
  activefilter: FILTERS,
  lastlogin: LAST_LOGIN,
  groupsid: DUMMY_ID,
};

const dummyActive: ActiveT = {
  id: DUMMY_ID,
  fullname: FULL_NAME,
  email: LEADER_EMAIL,
  filters: FILTERS,
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

async function updateUserLastLogin(userEmail: string, time: string) {
  await axios
    .post(`${config.API_URL}/user/login/update`, {
      email: userEmail,
      time: time,
    })
    .then((res) => {
      console.log(res.data);
    })
    .catch((error) => {
      console.error(error);
    });
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
  updateUserLastLogin,
  dummyUser,
  getActive,
  setActive,
  setFilters,
  dummyActive,
};

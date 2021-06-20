import Database from "./Database";

const express = require("express");
const cors = require("cors");
const app = express();

require("dotenv").config();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post("/group/add", async (req, res) => {
  try {
    const addedGroup = await Database.addGroup(req.body);
    console.log(addedGroup);
    res.json(addedGroup);
  } catch (error) {
    res.body = "Error: " + error;
  }
});

app.post("/group/join", async (req, res) => {
  try {
    const joinedGroup = await Database.joinGroup(req.body);
    console.log(joinedGroup);
    res.json(joinedGroup);
  } catch (error) {
    res.body = "Error: " + error;
  }
});

app.get("/group", async (req, res) => {
  try {
    const groups = await Database.getAllGroups();
    console.log(groups);
    res.json(groups);
  } catch (error) {
    res.body = "Error: " + error;
  }
});

app.post("/group/hackathon", async (req, res) => {
  try {
    const groups = await Database.getHackathonGroups(req.body);
    console.log(groups);
    res.json(groups);
  } catch (error) {
    res.body = "Error: " + error;
  }
});

app.post("/group/one", async (req, res) => {
  try {
    const group = await Database.getGroup(req.body);
    console.log(group);
    res.json(group);
  } catch (error) {
    res.body = "Error: " + error;
  }
});

app.post("/project/add", async (req, res) => {
  try {
    const addedProject = await Database.addProject(req.body);
    console.log(addedProject);
    res.json(addedProject);
  } catch (error) {
    res.body = "Error: " + error;
  }
});

app.get("/project", async (req, res) => {
  try {
    const projects = await Database.getAllProjects();
    console.log(projects);
    res.json(projects);
  } catch (error) {
    res.body = "Error: " + error;
  }
});

app.post("/project/one", async (req, res) => {
  try {
    const project = await Database.getProject(req.body);
    console.log(project);
    res.json(project);
  } catch (error) {
    res.body = "Error: " + error;
  }
});

app.post("/user/login/update", async (req, res) => {
  try {
    const updatedUser = await Database.updateUserLogin(req.body);
    console.log(updatedUser);
    res.json(updatedUser);
  } catch (error) {
    res.body = "Error: " + error;
  }
});

app.post("/user/activefilter/update", async (req, res) => {
  try {
    const updatedUser = await Database.updateActiveFilter(req.body);
    console.log(updatedUser);
    res.json(updatedUser);
  } catch (error) {
    res.body = "Error: " + error;
  }
});

app.post("/active/email/update", async (req, res) => {
  try {
    const updatedUser = await Database.updateActive(req.body);
    console.log(updatedUser);
    res.json(updatedUser);
  } catch (error) {
    res.body = "Error: " + error;
  }
});

app.get("/user/one", async (req, res) => {
  try {
    const project = await Database.getUser(req.body);
    console.log(project);
    res.json(project);
  } catch (error) {
    res.body = "Error: " + error;
  }
});

app.get("/active/one", async (req, res) => {
  try {
    const project = await Database.getActive();
    console.log(project);
    res.json(project);
  } catch (error) {
    res.body = "Error: " + error;
  }
});

app.get("/user/", async (req, res) => {
  try {
    const users = await Database.getAllUsers();
    console.log(users);
    res.json(users);
  } catch (error) {
    res.body = "Error: " + error;
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

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

app.get("/group", async (req, res) => {
  try {
    const groups = await Database.getAllGroups();
    console.log(groups);
    res.json(groups);
  } catch (error) {
    res.body = "Error: " + error;
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

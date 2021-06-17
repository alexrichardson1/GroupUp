import { groupSQL, projectSQL, userSQL } from "./Sql";

const pgp = require("pg-promise")({});
require("dotenv").config();

const dbInfo = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
  ssl: true,
};

const db = pgp(dbInfo);

class Database {
  static async addGroup(attr) {
    var result = {};

    await db
      .one(groupSQL.addGroup, attr)
      .then((data) => {
        console.log(data);
        result = data;
      })
      .catch((error) => {
        console.log("ERROR:", error); // print error;
      });

    return result;
  }

  static async joinGroup(attr) {
    var result = {};

    await db
      .one(groupSQL.joinGroup, attr)
      .then((data) => {
        console.log(data);
        result = data;
      })
      .catch((error) => {
        console.log("ERROR:", error); // print error;
      });

    return result;
  }

  static async getAllGroups() {
    var result = {};

    await db
      .any(groupSQL.getAllGroups)
      .then((data) => {
        console.log(data);
        result = data;
      })
      .catch((error) => {
        console.log("ERROR:", error); // print error;
      });

    return result;
  }

  static async getHackathonGroups(attr) {
    var result = {};

    await db
      .any(groupSQL.getHackathonGroups, attr)
      .then((data) => {
        console.log(data);
        result = data;
      })
      .catch((error) => {
        console.log("ERROR:", error); // print error;
      });

    return result;
  }

  static async getGroup(attr) {
    var result = {};

    await db
      .oneOrNone(groupSQL.getGroup, attr)
      .then((data) => {
        console.log(data);
        result = data;
      })
      .catch((error) => {
        console.log("ERROR:", error); // print error;
      });

    return result;
  }

  static async getProject(attr) {
    var result = {};

    await db
      .oneOrNone(projectSQL.getProject, attr)
      .then((data) => {
        console.log(data);
        result = data;
      })
      .catch((error) => {
        console.log("ERROR:", error); // print error;
      });

    return result;
  }

  static async addProject(attr) {
    var result = {};

    await db
      .one(projectSQL.addProject, attr)
      .then((data) => {
        console.log(data);
        result = data;
      })
      .catch((error) => {
        console.log("ERROR:", error); // print error;
      });

    return result;
  }

  static async getAllProjects() {
    var result = {};

    await db
      .any(projectSQL.getAllProjects)
      .then((data) => {
        console.log(data);
        result = data;
      })
      .catch((error) => {
        console.log("ERROR:", error); // print error;
      });

    return result;
  }

  static async getAllUsers() {
    var result = {};

    await db
      .any(userSQL.getAllUsers)
      .then((data) => {
        console.log(data);
        result = data;
      })
      .catch((error) => {
        console.log("ERROR:", error); // print error;
      });

    return result;
  }

  static async updateUserLogin(attr) {
    var result = {};

    await db
      .one(userSQL.updateUserLogin, attr)
      .then((data) => {
        console.log(data);
        result = data;
      })
      .catch((error) => {
        console.log("ERROR:", error); // print error;
      });

    return result;
  }

  static async updateActiveFilter(attr) {
    var result = {};
    await db
      .one(userSQL.updateActiveFilter, attr)
      .then((data) => {
        console.log(data);
        result = data;
      })
      .catch((error) => {
        console.log("ERROR:", error); // print error;
      });
    return result;
  }

  static async getUser(attr) {
    var result = {};

    await db
      .oneOrNone(userSQL.getUser, attr)
      .then((data) => {
        console.log(data);
        result = data;
      })
      .catch((error) => {
        console.log("ERROR:", error); // print error;
      });

    return result;
  }
}

export default Database;

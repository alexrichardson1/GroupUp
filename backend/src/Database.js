import { groupSQL } from "./Sql";

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
}

export default Database;

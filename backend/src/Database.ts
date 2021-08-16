import { groupSQL, projectSQL, userSQL, activeSQL } from "./Sql";
import {
  ActiveT,
  GroupT,
  ProjectT,
  UserT,
} from "../../frontend/src/types/types";

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
  static async addGroup(attr: GroupT) {
    //@ts-ignore
    var result: GroupT = {};
    await db
      .one(groupSQL.addGroup, attr)
      .then((data: GroupT) => {
        console.log(data);
        result = data;
      })
      .catch(console.error);

    return result;
  }

  static async joinGroup(attr: { name: string; groupid: number }) {
    var result = {};
    await db
      .one(groupSQL.joinGroup, attr)
      .then((data: GroupT) => {
        console.log(data);
        result = data;
      })
      .catch(console.error);
    return result;
  }

  static async getAllGroups() {
    var result: GroupT[] = [];
    await db
      .any(groupSQL.getAllGroups)
      .then((data: GroupT[]) => {
        console.log(data);
        result = data;
      })
      .catch(console.error);

    return result;
  }

  static async getHackathonGroups(attr: { hackathonid: number }) {
    var result: GroupT[] = [];
    await db
      .any(groupSQL.getHackathonGroups, attr)
      .then((data: GroupT[]) => {
        console.log(data);
        result = data;
      })
      .catch(console.error);

    return result;
  }

  static async getGroup(attr: { groupid: string }) {
    //@ts-ignore
    var result: GroupT = {};
    await db
      .oneOrNone(groupSQL.getGroup, attr)
      .then((data: GroupT) => {
        console.log(data);
        result = data;
      })
      .catch(console.error);

    return result;
  }

  static async getProject(attr: { projectid: string }) {
    //@ts-ignore
    var result: ProjectT = {};
    await db
      .oneOrNone(projectSQL.getProject, attr)
      .then((data: ProjectT) => {
        console.log(data);
        result = data;
      })
      .catch(console.error);
    return result;
  }

  static async addProject(attr: ProjectT) {
    //@ts-ignore
    var result: ProjectT = {};
    await db
      .one(projectSQL.addProject, attr)
      .then((data: ProjectT) => {
        console.log(data);
        result = data;
      })
      .catch(console.error);
    return result;
  }

  static async getAllProjects() {
    var result: ProjectT[] = [];
    await db
      .any(projectSQL.getAllProjects)
      .then((data: ProjectT[]) => {
        console.log(data);
        result = data;
      })
      .catch(console.error);
    return result;
  }

  static async getAllUsers() {
    var result: UserT[] = [];
    await db
      .any(userSQL.getAllUsers)
      .then((data: UserT[]) => {
        console.log(data);
        result = data;
      })
      .catch(console.error);
    return result;
  }

  static async updateUserLogin(attr: { time: string; email: string }) {
    //@ts-ignore
    var result: UserT = {};
    await db
      .one(userSQL.updateUserLogin, attr)
      .then((data: UserT) => {
        console.log(data);
        result = data;
      })
      .catch(console.error);

    return result;
  }

  static async updateActiveFilter(attr: { filters: string[]; email: string }) {
    //@ts-ignore
    var result: UserT = {};
    await db
      .one(userSQL.updateActiveFilter, attr)
      .then((data: UserT) => {
        console.log(data);
        result = data;
      })
      .catch(console.error);
    return result;
  }

  static async updateActive(attr: { fullname: string; email: string }) {
    //@ts-ignore
    var result: ActiveT = {};
    await db
      .one(activeSQL.updateActive, attr)
      .then((data: ActiveT) => {
        console.log(data);
        result = data;
      })
      .catch(console.error);
    return result;
  }

  static async getUser(attr: { email: string }) {
    //@ts-ignore
    var result: UserT = {};
    await db
      .oneOrNone(userSQL.getUser, attr)
      .then((data: UserT) => {
        console.log(data);
        result = data;
      })
      .catch(console.error);
    return result;
  }

  static async getActive() {
    var result: ActiveT[] = [];
    await db
      .oneOrNone(activeSQL.getActive)
      .then((data: ActiveT[]) => {
        console.log(data);
        result = data;
      })
      .catch(console.error);
    return result;
  }
}

export default Database;

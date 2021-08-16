import { QueryFile } from "pg-promise";
import path from "path";

function sql(filename: string) {
  const sqlPath = path.join(__dirname, filename);
  return new QueryFile(sqlPath, { minify: true });
}

const SQL_PATH = "../sql/";

export const groupSQL = {
  addGroup: sql(`${SQL_PATH}addGroup.sql`),
  joinGroup: sql(`${SQL_PATH}joinGroup.sql`),
  getAllGroups: sql(`${SQL_PATH}getAllGroups.sql`),
  getHackathonGroups: sql(`${SQL_PATH}getHackathonGroups.sql`),
  getGroup: sql(`${SQL_PATH}getGroup.sql`),
};

export const projectSQL = {
  addProject: sql(`${SQL_PATH}addProject.sql`),
  getProject: sql(`${SQL_PATH}getProject.sql`),
  getAllProjects: sql(`${SQL_PATH}getAllProjects.sql`),
};

export const userSQL = {
  updateUserLogin: sql(`${SQL_PATH}updateUserLogin.sql`),
  updateActiveFilter: sql(`${SQL_PATH}updateActiveFilter.sql`),
  getUser: sql(`${SQL_PATH}getUser.sql`),
  getAllUsers: sql(`${SQL_PATH}getAllUsers.sql`),
};

export const activeSQL = {
  updateActive: sql(`${SQL_PATH}updateActive.sql`),
  getActive: sql(`${SQL_PATH}getActive.sql`),
};

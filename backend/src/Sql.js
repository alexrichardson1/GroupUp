import { QueryFile } from "pg-promise";
import path from "path";

function sql(filename) {
  const sqlPath = path.join(__dirname, filename);
  return new QueryFile(sqlPath, { minify: true });
}

export const groupSQL = {
  addGroup: sql("../sql/addGroup.sql"),
  joinGroup: sql("../sql/joinGroup.sql"),
  getAllGroups: sql("../sql/getAllGroups.sql"),
  getHackathonGroups: sql("../sql/getHackathonGroups.sql"),
  getGroup: sql("../sql/getGroup.sql"),
};

export const projectSQL = {
  addProject: sql("../sql/addProject.sql"),
  getProject: sql("../sql/getProject.sql"),
  getAllProjects: sql("../sql/getAllProjects.sql"),
};

export const userSQL = {
  updateUserLogin: sql("../sql/updateUserLogin.sql"),
  updateActiveFilter: sql("../sql/updateActiveFilter.sql"),
  getUser: sql("../sql/getUser.sql"),
  getAllUsers: sql("../sql/getAllUsers.sql"),
};

export const activeSQL = {
  updateActive: sql("../sql/updateActive.sql"),
  getActive: sql("../sql/getActive.sql"),
};

import { QueryFile } from "pg-promise";
import path from "path";

function sql(filename) {
  const sqlPath = path.join(__dirname, filename);
  return new QueryFile(sqlPath, { minify: true });
}

export const groupSQL = {
  addGroup: sql("../sql/addGroup.sql"),
  getAllGroups: sql("../sql/getAllGroups.sql"),
};

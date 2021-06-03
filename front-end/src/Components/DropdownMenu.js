import React, { useState } from "react";
// import data from "../Teams";

const DropdownMenu = () => {
  const [open, setOpen] = useState(false);

  const getGroups = () => {
    //     let groupIds = [];
    //     data.forEach((group) => groupIds.push(group[projectId]));
    //     let uniqueIds = [...new Set(groupIds)];
    //     return uniqueIds;
  };

  return;
  // <div>
  //   <button onClick={() => setOpen(!open)}>Select Project</button>
  //   {open && getGroups().map((id) => <a href="/listings">{id}</a>)}
  // </div>;
};

export default DropdownMenu;

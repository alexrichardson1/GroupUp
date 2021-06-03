import React, { useState } from "react";
import "./styles.css";

// import data from "../Teams";

// const DropdownMenu = () => {
//   const [open, setOpen] = useState(false);

//   const getGroups = () => {
//     //     let groupIds = [];
//     //     data.forEach((group) => groupIds.push(group[projectId]));
//     //     let uniqueIds = [...new Set(groupIds)];
//     //     return uniqueIds;
//   };

//   return null;
//   // <div>
//   //   <button onClick={() => setOpen(!open)}>Select Project</button>
//   //   {open && getGroups().map((id) => <a href="/listings">{id}</a>)}
//   // </div>;
// };

// // export default DropdownMenu;

export default function DropdownMenu({ years }) {
  return (
    <div className="dropdown">
      <div className="control">
        <div className="selected-value">Select year...</div>
        <div className="arrow" />
      </div>
      <div className="options">
        {years.map((year) => (
          <div className="option">{year}</div>
        ))}
      </div>
    </div>
  );
}

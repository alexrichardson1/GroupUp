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

export default function DropdownMenu({ promt, options, value, onChange }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="dropdown">
      <div className="control" onClick={() => setOpen((prev) => !prev)}>
        <div className="selected-value">{promt}</div>
        <div className={`arrow ${open ? "open" : null}`} />
      </div>
      <div className={`options ${open ? "open" : null}`}>
        {options.map((option) => (
          <div
            className="option"
            onClick={() => {
              onChange(option);
              setOpen(false); // automatically close dropdown
            }}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
}

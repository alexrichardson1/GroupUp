import React from "react";
import { Link } from "react-router-dom";
import Test from "./Test";

{
  /* <Link to={"./Dashboard"}>Dashboard</Link>; */
}

const Navigation = () => {
  return (
    <div>
      <Link to={"./Test"}>Test Link</Link>
    </div>
  );
};

export default Navigation;

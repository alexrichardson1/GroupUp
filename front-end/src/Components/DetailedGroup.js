import React from "react";
import { useParams } from "react-router-dom";
import "../../node_modules/bootstrap/dist/css/bootstrap.css";
import data from "../Teams";

const DetailedGroup = () => {
  const { id } = useParams();
  const groupId = parseInt(id);
  const { leader, maxMembers, teammates, requirements, adRequirements } =
    data.filter((group) => group.id === groupId)[0];
  const membersNeeded = maxMembers - teammates.length;
  console.log(maxMembers, teammates.length);
  const leaderFirstName = leader.split(" ")[0];

  return (
    <React.Fragment>
      <h1>{groupId}</h1>
      <h1>{leaderFirstName}'s Group</h1>
      <h2>{membersNeeded} members needed</h2>
      <div>
        <h2>Other Members</h2>
        <ul class="list-group">
          {teammates.map((person) => (
            <li class="list-group-item">{person}</li>
          ))}
        </ul>
      </div>
      <h2>Requirements:</h2>
      <h3>Language: {requirements["Code Language"]}</h3>
      <h3>Timezone: GMT{requirements["Timezone"]}</h3>
      <h3>Preferred Language: {requirements["Spoken Language"]}</h3>
      {adRequirements && (
        <div>
          <h3>Additional Requirements:</h3>
          <p>{adRequirements}</p>
        </div>
      )}
      <a href="/listings">
        <button className="btn">Go Back</button>
      </a>
      <button
        type="button"
        class="btn btn-dark"
        onMouseOver={() => alert("Feature not implemented")}
      >
        Request to Join
      </button>
    </React.Fragment>
  );
};

export default DetailedGroup;

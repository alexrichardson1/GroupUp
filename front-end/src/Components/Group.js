const Group = ({ group }) => {
  const { leader, teammates, requirements, adRequirements } = group;

  const temp = () => console.log("hello world!");

  let keyGen1 = 0;
  let keyGen2 = 0;

  return (
    <div onClick={temp} className="group">
      <h1>{leader}'s Group</h1>
      <ul>
        {/* <li>
          Other Members:
          <ul>
            {teammates.map((name) => (
              <li key={keyGen1++}>{name}</li>
            ))}
          </ul>
        </li> */}
        <li>
          Requirements:
          <ul>
            {Object.keys(requirements).map((key) => (
              <li key={keyGen2++}>{key + ": " + requirements[key]}</li>
            ))}
            {/* {for (let key in requirements.keys()) {
              if(requirements.hasOwnProperty()) {
                <li key={keyGen2++}>key</li>
              }
            }
            } */}

            {/* {requirements.map((req) => (
              <li key={keyGen2++}>{req}</li>
            ))} */}
          </ul>
        </li>
        <li>Additional Requirements: {adRequirements}</li>
      </ul>
      <button className="btn" onClick={null}>
        Join Group
      </button>
    </div>
  );
};

export default Group;

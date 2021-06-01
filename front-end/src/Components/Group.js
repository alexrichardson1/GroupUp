const Group = ({ group }) => {
  const { leader, teammates, requirements, adRequirements } = group;

  const temp = () => console.log("hello world!");

  return (
    <div onClick={temp} className="group">
      <h1>{leader}'s Group</h1>
      <ul>
        <li>
          Other Members:
          <ul>
            {teammates.map((name) => (
              <li>{name}</li>
            ))}
          </ul>
        </li>
        <li>
          Requirements:
          <ul>
            {requirements.map((req) => (
              <li>{req}</li>
            ))}
          </ul>
        </li>
        <li>Additional Requirements: {adRequirements}</li>
      </ul>
      <button class="btn" onClick={null}>
        Join Group
      </button>
    </div>
  );
};

export default Group;

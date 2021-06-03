const Group = ({ group }) => {
  const { id, leader, requirements, adRequirements } = group;

  const temp = () => console.log("hello world!");

  // let keyGen1 = 0;
  let keyGen2 = 0;

  return (
    <div onClick={temp} className="group">
      <h1>{leader}'s Group</h1>
      <ul>
        <li>
          Requirements:
          <ul>
            {Object.keys(requirements).map((key) => (
              <li key={keyGen2++}>{key + ": " + requirements[key]}</li>
            ))}
          </ul>
        </li>
        <li>Additional Requirements: {adRequirements}</li>
      </ul>
      <a href={`/group/${id}`}>
        <button className="btn">Find out more</button>
      </a>
    </div>
  );
};

export default Group;

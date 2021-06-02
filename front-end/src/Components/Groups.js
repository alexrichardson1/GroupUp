import Group from "./Group";

const Groups = ({ groups }) => {
  return (
    <div>
      {groups.map((group) => (
        <Group group={group} key={group.id} />
      ))}
    </div>
  );
};

export default Groups;

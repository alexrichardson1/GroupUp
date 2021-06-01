import Group from "./Group";

const Groups = ({ groups }) => {
  return (
    <>
      {groups.map((group) => (
        <Group group={group} />
      ))}
    </>
  );
};

export default Groups;

import { Link, useParams } from "react-router-dom";
import data from "../Teams";

const DetailedGroup = () => {
  const { id } = useParams();
  const { leader, maxMembers, teammates, requirements, adRequirements } =
    data[parseInt(id)];
  return <h3>This is a detailed group {leader}</h3>;
};

export default DetailedGroup;

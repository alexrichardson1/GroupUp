import { Button, Col, Container, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Group from "./Group";
import axios from "axios";

async function getGroups() {
  var result = [];
  await axios
    .get("http://localhost:5000/group")
    .then((res) => {
      const groups = res.data;
      result = groups;
    })
    .catch((error) => {
      console.log(error);
    });
  return result;
}

async function getProjects() {
  var result = [];
  await axios
    .get("http://localhost:5000/project")
    .then((res) => {
      const hacks = res.data;
      result = hacks;
    })
    .catch((error) => {
      console.log(error);
    });
  return result;
}

const Groups = () => {
  const { id } = useParams();
  const hackathonId = parseInt(id);

  // const [allGroups, setAllGroups] = useState([]);
  const [, setAllGroups] = useState([]);
  const [filteredGroups, setFilteredGroups] = useState([]);
  // const [activeFilters, setActiveFilters] = useState(new Map());
  const [activeFilters] = useState(new Map());
  // const [hackathons, setHackathons] = useState([]);
  const [, setHackathons] = useState([]);

  // const setGroups = async () => {
  //   const nonFilteredGroups = await getGroups();
  //   const filteredGroups = nonFilteredGroups.filter(
  //     (group) => group.projectid === hackathonId
  //   );
  //   const hackathonList = await getProjects();
  //   setHackathons(hackathonList);
  //   setAllGroups(filteredGroups);
  //   setFilteredGroups(filteredGroups);
  // };

  // const hackathonReqs = async () => {
  //   // const allHacks = await getProjects();
  //   const allHacks = await hackathons;
  //   console.log("The hackathons:");
  //   allHacks.forEach((h) => console.log(h));
  //   console.log(
  //     allHacks.filter((proj) => proj.id === hackathonId).requirements
  //   );
  //   return allHacks.filter((proj) => proj.id === hackathonId).requirements;
  //   // return [];
  // };

  useEffect(() => {
    const setGroupData = async () => {
      const nonFilteredGroups = await getGroups();
      const filteredGroups = nonFilteredGroups.filter(
        (group) => group.projectid === hackathonId
      );
      const hackathonList = await getProjects();
      setHackathons(hackathonList);
      setAllGroups(filteredGroups);
      setFilteredGroups(filteredGroups);
    };

    setGroupData();
  }, [hackathonId, setAllGroups, setHackathons]);

  useEffect(() => {
    for (const [k, v] of activeFilters.entries()) {
      setFilteredGroups((f) =>
        f.filter((group) => group.requirements[k] === v)
      );
    }

    console.log("Active Filters after: ");

    for (const [k, v] of activeFilters.entries()) {
      console.log(k, v);
    }
    console.log("--------------------");
  }, [activeFilters]);

  // const updateFilter = (key, value) => {
  //   setActiveFilters((prev) => new Map(prev).set(key, value));
  // };

  // const removeFilter = (key) => {
  //   setActiveFilters((prev) => {
  //     const newState = new Map(prev);
  //     newState.delete(key);
  //     return newState;
  //   });
  // };

  // const filterGroupsOnReq = (reqName, reqVal) => {
  //   setFilteredGroups(allGroups);
  //   console.log("--------------------");
  //   console.log(
  //     "attempting filter of {" + reqName + "} and with value {" + reqVal + "}"
  //   );
  //   console.log("Active Filters before: ");
  //   updateFilter(reqName, reqVal);
  // };

  // const getAllReqVars = (req) => {
  //   const vars = new Set();
  //   allGroups.forEach((group) => vars.add(group.requirements[req]));
  //   return [...vars];
  // };

  // const deleteFilter = (reqName) => {
  //   removeFilter(reqName);
  //   const newFilteredGroups = allGroups;
  //   for (const [k, v] of activeFilters.entries()) {
  //     newFilteredGroups.filter((group) => group.requirements[k] === v);
  //   }
  //   setFilteredGroups(newFilteredGroups);
  // };

  return (
    <div>
      <Container>
        <Row>
          <h3>{filteredGroups.length} Groups looking for members:</h3>
        </Row>
        <Row>
          <LinkContainer to="/createGroup">
            <Button>Advertise my group!</Button>
          </LinkContainer>
        </Row>
        <Row>
          <Col>
            <h1>{activeFilters.size}</h1>
            {/* {console.log(hackat honReqs)} */}
            {/* {hackathonReqs.map((req) => (
              <Filter
                requirementName={req}
                requirementsList={getAllReqVars(req)}
                filterFunction={filterGroupsOnReq}
                resetFunction={deleteFilter}
              />
            ))} */}
          </Col>
          <Col>
            {filteredGroups.map((group) => (
              <Group group={group} key={group.id} />
            ))}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Groups;

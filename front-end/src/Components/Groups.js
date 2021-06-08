import Group from "./Group";
import { Button, Col, Container, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Filter from "./Filter";
import hackathons from "../data/projects.json";

const Groups = ({ allGroups }) => {
  const { id } = useParams();
  const hackathonId = parseInt(id);
  const hackathonName = hackathons.filter((proj) => proj.id === hackathonId)[0]
    .name;
  const hackathonGroups = allGroups.filter(
    (group) => group.projectId === hackathonId
  );
  const hackathonReqs = hackathons.filter((proj) => proj.id === hackathonId)[0]
    .requirements;

  const [filteredGroups, setFilteredGroups] = useState([...hackathonGroups]);
  const [activeFilters, setActiveFilters] = useState(new Map());

  useEffect(() => {
    // const newFilteredGroups = hackathonGroups;

    // for (const [k, v] of activeFilters.entries()) {
    //   newFilteredGroups.filter((group) => group.requirements[k] === v);
    // }
    // setFilteredGroups(newFilteredGroups);

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

  // const addFilter = (key, value) => {
  //   setActiveFilters((prev) => new Map([...prev, [key, value]]));
  // };

  const updateFilter = (key, value) => {
    setActiveFilters((prev) => new Map(prev).set(key, value));
  };

  const removeFilter = (key) => {
    setActiveFilters((prev) => {
      const newState = new Map(prev);
      newState.delete(key);
      return newState;
    });
  };

  // const clearAllFilters = () => {
  //   setActiveFilters((prev) => new Map(prev.clear()));
  // };

  {
    /* This will filter groups on all "active filters", plus the new filter specified. */
  }
  const filterGroupsOnReq = (reqName, reqVal) => {
    setFilteredGroups(hackathonGroups);
    console.log("--------------------");
    console.log(
      "attempting filter of {" + reqName + "} and with value {" + reqVal + "}"
    );
    console.log("Active Filters before: ");
    updateFilter(reqName, reqVal);

    // for (const [k, v] of activeFilters.entries()) {
    //   console.log(k, v);
    // }

    // {
    //   /* Change a filter case (rather than add), requires filtering from top level. */
    // }
    // if (activeFilters.has(reqName)) {
    //   console.log("This filter is replacing another " + reqName);
    //   // activeFilters.set(reqName, reqVar);
    //   updateFilter(reqName, reqVar);
    //   const newFilteredGroups = hackathonGroups;
    //   for (const [k, v] of activeFilters.entries()) {
    //     newFilteredGroups.filter((group) => group.requirements[k] === v);
    //   }
    //   setFilteredGroups(newFilteredGroups);
    // } else {
    //   // activeFilters.set(reqName, reqVar);
    //   addFilter(reqName, reqVar);
    //   setFilteredGroups(
    //     filteredGroups.filter((group) => group.requirements[reqName] === reqVar)
    //   );
    // }
    // console.log("Active Filters after: ");

    // for (const [k, v] of activeFilters.entries()) {
    //   console.log(k, v);
    // }
    // console.log("--------------------");
  };

  const getAllReqVars = (req) => {
    const vars = new Set();
    hackathonGroups.forEach((group) => vars.add(group.requirements[req]));
    return [...vars];
  };

  const deleteFilter = (reqName) => {
    // activeFilters.delete(reqName);
    removeFilter(reqName);
    const newFilteredGroups = hackathonGroups;
    for (const [k, v] of activeFilters.entries()) {
      newFilteredGroups.filter((group) => group.requirements[k] === v);
    }
    setFilteredGroups(newFilteredGroups);
  };

  return (
    <div>
      <Container>
        <Row>
          <h3>
            {filteredGroups.length} Groups looking for members in: 
            {hackathonName}
          </h3>
        </Row>
        <Row>
          <LinkContainer to="/createGroup">
            <Button>Advertise my group!</Button>
          </LinkContainer>
        </Row>
        <Row>
          <Col>
            <h1>{activeFilters.size}</h1>
            {hackathonReqs.map((req) => (
              <Filter
                requirementName={req}
                requirementsList={getAllReqVars(req)}
                filterFunction={filterGroupsOnReq}
                resetFunction={deleteFilter}
              />
            ))}
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

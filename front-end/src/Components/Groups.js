import Group from "./Group";
import { Button, Col, Container, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Filter from "./Filter";

const Groups = ({ allGroups }) => {
  const { id } = useParams();
  const hackathonId = parseInt(id);
  const hackathonGroups = allGroups.filter(
    (group) => group.projectId === hackathonId
  );

  const [filteredGroups, setFilteredGroups] = useState(hackathonGroups);

  const filterOnLanguage = (language) => {
    const newFilteredGroups = hackathonGroups.filter(
      (group) => group.requirements["Code Language"] === language
    );
    setFilteredGroups(newFilteredGroups);
  };

  const resetFilters = () => {
    setFilteredGroups(hackathonGroups);
  };

  const allLanguages = hackathonGroups.map(
    (groups) => groups.requirements["Code Language"]
  );
  const languagesSet = [...new Set(allLanguages)];

  return (
    <div>
      <Container>
        <Row>
          <h3>
            {filteredGroups.length} Groups looking for members in Hackathon
          </h3>
        </Row>
        <Row>
          <LinkContainer to="/createGroup">
            <Button>Advertise my group!</Button>
          </LinkContainer>
        </Row>
        <Row>
          <Col>
            <Filter
              requirementName="languages"
              requirementsList={languagesSet}
              filterFunction={filterOnLanguage}
              resetFunction={resetFilters}
            />
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

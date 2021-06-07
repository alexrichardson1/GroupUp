import Group from "./Group";
import {
  Button,
  Row,
  Container,
  Col,
  Form,
  Accordion,
  Card,
  ButtonGroup,
  ToggleButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import { useState } from "react";

const Groups = ({ groups }) => {
  const { id } = useParams();
  const groupId = parseInt(id);
  const totalGroups = groups.length;
  const [languageFilter, setLanguageFilter] = useState();

  const filteredGroups = groups.filter((group) => group.projectId === groupId);
  // if (!languageFilter) {
  //   return groups.filter((group) =>
  //     languageFilter.includes(group.requirements["Code Language"])
  //   );
  // }

  const languageList = () => {
    const allLanguages = filteredGroups.map(
      (groups) => groups.requirements["Code Language"]
    );
    const setLanguages = [...new Set(allLanguages)];
    return setLanguages.map((language) => (
      <ToggleButton>{language}</ToggleButton>
      // <Form.Check type="checkbox" label={language} key={language}></Form.Check>
    ));
  };

  return (
    <div>
      <Container>
        {/* TitleRow */}
        <Row>
          <h3>{totalGroups} Groups looking for members in Hackathon</h3>
        </Row>

        <Row>
          <LinkContainer to="/createGroup">
            <Button>Advertise my group!</Button>
          </LinkContainer>
        </Row>

        {/* Content Row */}
        <Row>
          {/* Filter Column */}
          <Col>
            <Accordion defaultActiveKey="0">
              <Card>
                <Accordion.Toggle as={Card.Header} variant="link" eventKey="0">
                  Language
                  {/* <img src={process.env.PUBLIC_URL + "/chevron-down.svg"} /> */}
                </Accordion.Toggle>

                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <ButtonGroup vertical toggle>
                      {languageList()}
                    </ButtonGroup>

                    <ToggleButtonGroup
                      type="checkbox"
                      // onChange={handleChange}
                    >
                      {languageList()}
                    </ToggleButtonGroup>
                    {/* <Form>
                      <Form.Group controlId="formBasicCheckbox"> */
                    /* {radios.map((radio, index) => (
                            <ToggleButton
                              key={index}
                              type="radio"
                              name="radio"
                              value={radio.value}
                              checked={radioValue === radio.value}
                              onChange={(e) =>
                                setRadioValue(e.currentTarget.value)
                              }
                            >
                              {radio.name}
                            </ToggleButton>
                          ))} */}
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </Col>

          {/* Listings Column */}
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

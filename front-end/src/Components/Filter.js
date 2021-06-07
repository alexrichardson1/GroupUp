import {
  Accordion,
  Card,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";

const Filter = ({ requirementName, requirementsList, filterFunction }) => {
  return (
    <div>
      <Accordion defaultActiveKey="0">
        <Card>
          <Accordion.Toggle as={Card.Header} variant="link" eventKey="0">
            Language
            {/* <img
                    className="dropdownIcons"
                    src={process.env.PUBLIC_URL + "/chevron-down.svg"}
                  /> */}
          </Accordion.Toggle>

          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <ToggleButtonGroup
                vertical
                name={new Date().getDate().toString()}
                type="radio"
                className="mb-2"
              >
                {requirementsList.map((req) => {
                  <ToggleButton
                    id="tbg-check-1"
                    value={req}
                    onClick={() => filterFunction()}
                  >
                    {req}
                  </ToggleButton>;
                })}
              </ToggleButtonGroup>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  );
};

export default Filter;

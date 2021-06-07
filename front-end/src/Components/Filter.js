import {
  Accordion,
  Card,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";

const Filter = ({
  requirementName,
  requirementsList,
  filterFunction,
  resetFunction,
}) => {
  return (
    <div>
      <Accordion defaultActiveKey="0">
        <Card>
          <Accordion.Toggle as={Card.Header} variant="link" eventKey="0">
            {requirementName}
            <img
              className="dropdownIcons"
              src={process.env.PUBLIC_URL + "/chevron-down.svg"}
              alt="drop down arrow"
            />
          </Accordion.Toggle>

          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <ToggleButtonGroup
                vertical
                name={requirementName}
                type="radio"
                className="mb-2"
              >
                {requirementsList.map((req) => {
                  return (
                    <ToggleButton
                      className="filterBox"
                      id={req}
                      value={req}
                      key={req}
                      onClick={() => filterFunction(req)}
                    >
                      {req}
                    </ToggleButton>
                  );
                })}
                <ToggleButton
                  className="filterBox"
                  id="Any"
                  value="Any"
                  key="Any"
                  onClick={() => resetFunction()}
                >
                  Any
                </ToggleButton>
              </ToggleButtonGroup>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  );
};

export default Filter;

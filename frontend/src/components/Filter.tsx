import {
  Accordion,
  Card,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";

interface Props {
  requirementName: string;
  requirementsList: string[];
  filterFunction: any;
  resetFunction: any;
}

const Filter = ({
  requirementName,
  requirementsList,
  filterFunction,
  resetFunction,
}: Props) => {
  return (
    <div>
      <Accordion>
        <Card>
          <Accordion.Toggle as={Card.Header} variant="link" eventKey="0">
            {requirementName === "Timezone"
              ? "Timezone (UTC +/-)"
              : requirementName}
            <img
              className="dropdownIcons"
              src={process.env.PUBLIC_URL + "/chevron-down.svg"}
              alt="drop down arrow"
            />
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <ToggleButtonGroup
                defaultValue={"Any"}
                vertical
                name={requirementName}
                type="radio"
                className="filterBox"
              >
                {requirementsList.map((req) => {
                  return (
                    <ToggleButton
                      id={req}
                      value={req}
                      key={req}
                      onChange={() => filterFunction(requirementName, req)}
                    >
                      {requirementName === "Timezone"
                        ? parseInt(req) > -1
                          ? "+" + req
                          : req
                        : req}
                    </ToggleButton>
                  );
                })}
                <ToggleButton
                  className="filterBox"
                  id="Any"
                  value="Any"
                  key="Any"
                  onChange={() => resetFunction(requirementName)}
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

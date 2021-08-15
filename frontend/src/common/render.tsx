import { Alert } from "react-bootstrap";

function allFieldsNotFilledIn(invalid: boolean) {
  if (invalid) {
    return <Alert variant="danger">Fill in all fields.</Alert>;
  }
  return null;
}

export { allFieldsNotFilledIn };

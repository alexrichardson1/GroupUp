import renderer from "react-test-renderer";
import { BrowserRouter } from "react-router-dom";
import SelectProject from "components/SelectProject";

test("renders correctly", () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        <SelectProject />
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

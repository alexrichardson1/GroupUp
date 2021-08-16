import renderer from "react-test-renderer";
import { BrowserRouter } from "react-router-dom";
import CreateGroup from "components/CreateGroup";

test("renders correctly", () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        <CreateGroup />
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

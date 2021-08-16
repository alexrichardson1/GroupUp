import renderer from "react-test-renderer";
import { BrowserRouter } from "react-router-dom";
import Groups from "components/Groups";

test("renders correctly", () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        <Groups />
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

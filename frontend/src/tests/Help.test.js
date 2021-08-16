import renderer from "react-test-renderer";
import { BrowserRouter } from "react-router-dom";
import Help from "components/Help";

test("renders correctly", () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        <Help />
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

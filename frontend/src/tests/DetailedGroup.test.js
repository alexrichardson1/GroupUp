import renderer from "react-test-renderer";
import { BrowserRouter } from "react-router-dom";
import DetailedGroup from "components/DetailedGroup";

test("renders correctly", () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        <DetailedGroup />
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

import renderer from "react-test-renderer";
import { BrowserRouter } from "react-router-dom";
import MyGroups from "components/MyGroups";

test("renders correctly",async  () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        <MyGroups />
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

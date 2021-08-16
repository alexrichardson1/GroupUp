import renderer from "react-test-renderer";
import { BrowserRouter } from "react-router-dom";
import NavBar from "components/NavBar";

test("renders correctly", async () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        <NavBar renderBool={[true, true, true, true]} />
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

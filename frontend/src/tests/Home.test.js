import renderer from "react-test-renderer";
import { BrowserRouter } from "react-router-dom";
import Home from "components/Home";

test("renders correctly", async () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

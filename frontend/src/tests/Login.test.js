import renderer from "react-test-renderer";
import { BrowserRouter } from "react-router-dom";
import Login from "components/auth/Login";

test("renders correctly", () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

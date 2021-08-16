import renderer from "react-test-renderer";
import { BrowserRouter } from "react-router-dom";
import SignUp from "components/auth/SignUp";

test("renders correctly", async () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

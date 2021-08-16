import renderer from "react-test-renderer";
import { BrowserRouter } from "react-router-dom";
import ForgotPassword from "components/auth/ForgotPassword";

test("renders correctly", () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        <ForgotPassword />
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

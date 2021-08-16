import renderer from "react-test-renderer";
import App from "App";

test("renders correctly", async () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});

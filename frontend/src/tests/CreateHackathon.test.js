import renderer from "react-test-renderer";
import { BrowserRouter } from "react-router-dom";
import CreateHackathon from "components/CreateHackathon";

test("renders correctly", async () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        <CreateHackathon />
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

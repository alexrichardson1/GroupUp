import renderer from "react-test-renderer";
import { BrowserRouter } from "react-router-dom";
import Group from "components/Group";
import { dummyGroup } from "common/api";

test("renders correctly", async () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        <Group
          group={dummyGroup}
          requirementNames={["1", "TYPESCRIPT", "ENGLISH"]}
          projectId={0}
        />
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

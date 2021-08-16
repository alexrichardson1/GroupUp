import renderer from "react-test-renderer";
import { BrowserRouter } from "react-router-dom";
import SavedSearches from "components/SavedSearches";

test("renders correctly", async () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        <SavedSearches />
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

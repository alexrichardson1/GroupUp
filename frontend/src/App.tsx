import { useState } from "react";
import Groups from "components/Groups";
import Home from "components/Home";
import SelectProject from "components/SelectProject";
import DetailedGroup from "components/DetailedGroup";
import { BrowserRouter as Router, Route, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "App.css";
import CreateGroup from "components/CreateGroup";
import Login from "components/auth/Login";
import SignUp from "components/auth/SignUp";
import ForgotPassword from "components/auth/ForgotPassword";
import Help from "components/Help";
import { UserContext } from "components/auth/UserContext";
import SavedSearches from "components/SavedSearches";
import CreateHackathon from "components/CreateHackathon";
import MyGroups from "components/MyGroups";

function GroupsFunc() {
  const { id } = useParams<{ id: string }>();
  return <Groups id={parseInt(id)} />;
}

function CreateGroupFunc() {
  const { id } = useParams<{ id: string }>();
  //@ts-ignore
  return <CreateGroup id={parseInt(id)} />;
}

const App = () => {
  const [user, setUser] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  return (
    <Router>
      <UserContext.Provider value={{ user, setUser, email, setEmail }}>
        <div className="container">
          <Route path="/" exact component={Login}></Route>
          <Route path="/signup" exact component={SignUp}></Route>
          <Route
            path="/forgotpassword"
            exact
            component={ForgotPassword}
          ></Route>
          <Route path="/savedsearches" exact component={SavedSearches}></Route>
          <Route path="/myGroups" exact component={MyGroups}></Route>
          <Route path="/home" exact component={Home}></Route>
          <Route path="/selection" exact component={SelectProject}></Route>
          <Route
            path="/group/:id/:projectId"
            children={<DetailedGroup />}
          ></Route>
          <Route path="/listing/:id" children={<GroupsFunc />}></Route>
          <Route path="/createGroup/:id" children={<CreateGroupFunc />}></Route>
          <Route
            path="/createHackathon"
            exact
            component={CreateHackathon}
          ></Route>
          <Route path="/help" exact component={Help}></Route>
        </div>
      </UserContext.Provider>
    </Router>
  );
};

export default App;

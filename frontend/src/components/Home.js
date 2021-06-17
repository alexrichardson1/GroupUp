import { LinkContainer } from "react-router-bootstrap";
import { Button, Jumbotron, Card, ListGroup } from "react-bootstrap";
import NavBar from "components/NavBar";
import axios from "axios";
import { config } from "Constants";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "components/auth/UserContext";

const Home = () => {
  const [groups, setGroups] = useState([]);
  const { value } = useContext(UserContext);
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [user, setUser] = useState([]);
  const { email } = useContext(UserContext);

  const filterGroupsOnName = () => {
    return groups.filter(
      (group) =>
        group.leader === value ||
        group.teammates.some((member) => member === value)
    );
  };

  useEffect(() => {
    const getGroups = async () => {
      await axios
        .get(`${config.API_URL}/group/`)
        .then((res) => {
          const group = res.data;
          setGroups(group);
          setFilteredGroups(group);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    const getUser = async () => {
      var result = [];
      await axios
        .post(`${config.API_URL}/user/one`, {
          email: email,
        })
        .then((res) => {
          const groups = res.data;
          result = groups;
          console.log("results");
          console.log("results: " + result);
          setUser(result);
        })
        .catch((error) => {
          console.log(error);
        });
      return result;
    };
    getGroups();
    getUser();
  }, []);

  // const getGroups = async () => {
  //   var result = "";
  //   await axios
  //     .get(`${config.API_URL}/group`)
  //     .then((res) => {
  //       const groups = res.data;
  //       result = groups;
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  //   return result;
  // };

  const getPersonalisedGroups = () => {
    console.log("USERs");
    console.log(user);
    // const filters = user.filters;
    // console.log("filters: ");
    // console.log(filters);
    /*const filtered = filteredGroups().filter((gr) =>
      gr.requirements.includes()
    );*/
    // return filtered;
  };

  const personalFilters = () => {
    // {
    //   filteredGroups.map((group) => (
    //     <Group
    //       group={group}
    //       requirementNames={this.state.requirements}
    //       key={group.id}
    //     />
    //   ));
    // }
  };

  return (
    <div>
      <NavBar renderBool={[true, false, false, false]} create={false} />
      <Button onClick={() => getPersonalisedGroups()}>sdsd</Button>
      <Jumbotron>
        <h1 className="title">Welcome to GroupUp</h1>
        <div>
          An easy tool for helping you find a group for your next Hackathon!
        </div>
        <LinkContainer to="/selection">
          <Button>Get Started</Button>
        </LinkContainer>
        <h3 className="groupsHome">Groups you're already in.</h3>
        <div>
          {/*  {filterGroupsOnName().map((group) => (
            
           ))} */}
        </div>
        <div>
          {filterGroupsOnName().map((group) => (
            <Card.Body>
              <Card.Title>{group.leader}'s Group</Card.Title>
              <Card.Text>
                <ListGroup.Item variant="dark">Other Members:</ListGroup.Item>
                {group.teammates.map((teammate) => (
                  <ListGroup.Item variant="flush">{teammate}</ListGroup.Item>
                ))}
              </Card.Text>
              <LinkContainer to={`/group/${group.id}`}>
                <Button>More Info</Button>
              </LinkContainer>
            </Card.Body>
          ))}
        </div>
      </Jumbotron>
    </div>
  );
};

export default Home;

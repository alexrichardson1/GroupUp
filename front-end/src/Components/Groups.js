import { Button, Col, Container, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Filter from "./Filter";
import Group from "./Group";
import axios from "axios";
// import { Link } from "react-router-dom";

async function getGroups() {
  var result = [];
  await axios
    .get("http://localhost:5000/group")
    .then((res) => {
      const groups = res.data;
      result = groups;
    })
    .catch((error) => {
      console.log(error);
    });
  return result;
}

const Groups = () => {
  const { id } = useParams();
  const hackathonId = parseInt(id);

  const [filteredGroups, setFilteredGroups] = useState([]);
  const [allGroups, setAllGroups] = useState([]);

  const setGroups = async () => {
    const nonFilteredGroups = await getGroups();
    const filteredGroups = nonFilteredGroups.filter(
      (group) => group.projectid === hackathonId
    );
    setAllGroups(filteredGroups);
    setFilteredGroups(filteredGroups);
  };

  useEffect(() => {
    setGroups();
  }, []);

  const filterOnLanguage = (language) => {
    const newFilteredGroups = allGroups.filter(
      (group) => group.requirements[0] === language
    );
    setFilteredGroups(newFilteredGroups);
  };

  const resetFilters = () => {
    setFilteredGroups(allGroups);
  };

  const allLanguages = allGroups.map((groups) => groups.requirements[0]);
  const languagesSet = [...new Set(allLanguages)];

  return (
    <div>
      <Container>
        <Row>
          <h3>
            {filteredGroups.length} Groups looking for members in Hackathon
          </h3>
        </Row>
        <Row>
          <LinkContainer to="/createGroup">
            <Button>Advertise my group!</Button>
          </LinkContainer>
        </Row>
        <Row>
          <Col>
            <Filter
              requirementName="languages"
              requirementsList={languagesSet}
              filterFunction={filterOnLanguage}
              resetFunction={resetFilters}
            />
          </Col>
          <Col>
            {filteredGroups.map((group) => (
              <Group group={group} key={group.id} />
            ))}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Groups;

// async function getGroups() {
//   var result = [];
//   await axios
//     .get("http://localhost:5000/group")
//     .then((res) => {
//       const groups = res.data;
//       console.log(groups);
//       result = groups;
//     })
//     .catch((error) => {
//       console.log(error);
//     });
//   return result;
// }

// export default class Groups extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { groups: [] };
//   }

//   async componentDidMount() {
//     this.setState({ groups: await getGroups() });
//   }

//   render() {
//     return (
//       <div>
//         <h3>2 Groups looking for members in Project X</h3>
//         <Link to="/createGroup">
//           <button className="btn">Advertise my group!</button>
//         </Link>
//         {this.state.groups.map((group) => (
//           <Group group={group} key={group.id} />
//         ))}
//       </div>
//     );
//   }
// }

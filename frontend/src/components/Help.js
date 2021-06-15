import { Component } from "react";
import React from "react";
import { Button, Card } from "react-bootstrap";
import ReactCardFlip from "react-card-flip";
import Navbar from "components/NavBar";

export default class Help extends Component {
  constructor() {
    super();
    this.state = {
      flipped: new Set(),
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(id) {
    return (e) => {
      e.preventDefault();
      let flipped = new Set(this.state.flipped);
      flipped.has(id) ? flipped.delete(id) : flipped.add(id);
      this.setState({ flipped });
    };
  }

  render() {
    return (
      <div>
        <Navbar renderBool={[false, false, false, false]} helpPage={true} />

        <ReactCardFlip
          isFlipped={this.state.flipped.has(1)}
          flipDirection="horizontal"
        >
          <Card>
            <Card.Body>
              <Card.Title>What Is A Hackathon?</Card.Title>
              <Card.Img
                variant="top"
                src={process.env.PUBLIC_URL + "/hackathons.webp"}
              />
              <Button onClick={this.handleClick(1)}>Click to flip</Button>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <Card.Title>Information</Card.Title>
              <Card.Img
                variant="top"
                src={process.env.PUBLIC_URL + "/hackathons.webp"}
              />
              <Card.Text>
                Hackathons are a time llmited event where teams work together to
                build software for an array of reasons. They are a great way of
                sharpening your design technique, refining your programming
                ability and making friends. Use GroupUp to find your dream
                hackathon team! Use our filters to narrow down groups based on
                the programming language used, their time zone and more!
              </Card.Text>
              <Button onClick={this.handleClick(1)}>Click to flip</Button>
            </Card.Body>
          </Card>
        </ReactCardFlip>

        <ReactCardFlip
          isFlipped={this.state.flipped.has(2)}
          flipDirection="horizontal"
        >
          <Card>
            <Card.Body>
              <Card.Title>How To Join A Group</Card.Title>
              <Card.Img
                variant="top"
                src={process.env.PUBLIC_URL + "/groups.webp"}
              />
              <Button onClick={this.handleClick(2)}>Click to flip</Button>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <Card.Title>Information</Card.Title>
              <Card.Img
                variant="top"
                src={process.env.PUBLIC_URL + "/groups.webp"}
              />
              <Card.Text>
                Choose a Hackathon. Groups should be displayed for your chosen
                Hackathon. Make use of the filters if you have specific
                requirements. Click 'Find out more', then click 'Join Group'
              </Card.Text>
              <Button onClick={this.handleClick(2)}>Click to flip</Button>
            </Card.Body>
          </Card>
        </ReactCardFlip>

        <ReactCardFlip
          isFlipped={this.state.flipped.has(3)}
          flipDirection="horizontal"
        >
          <Card>
            <Card.Body>
              <Card.Title>How To Advertise Your Group</Card.Title>
              <Button onClick={this.handleClick(3)}>Click to flip</Button>
            </Card.Body>
          </Card>

          <Card>
            {/* <Card.Img variant="top" src="../images/groups.webp/100px160" /> */}
            <Card.Body>
              <Card.Title>Information</Card.Title>
              <Card.Text>
                Choose a Hackathon. Click 'Advertise my group!'. Fill out the
                required information. Click 'Submit'.
              </Card.Text>
              <Button onClick={this.handleClick(3)}>Click to flip</Button>
            </Card.Body>
          </Card>
        </ReactCardFlip>
      </div>
    );
  }
}

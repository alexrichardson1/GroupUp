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
            {/* <Card.Img variant="top" src="../images/groups.webp/100px160" /> */}
            <Card.Body>
              <Card.Title>What Is A Hackathon?</Card.Title>
              <Card.Text>
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer>
            <Button onClick={this.handleClick(1)}>Click to flip</Button>
          </Card>

          <Card>
            {/* <Card.Img variant="top" src="../images/groups.webp/100px160" /> */}
            <Card.Body>
              <Card.Title>Information</Card.Title>
              <Card.Text>
                Hackathons are a time llmited event where teams work together to
                build software for an array of reasons. They are a great way of
                sharpening your design technique, refining your programming
                ability and making friends. Use GroupUp to find your dream
                hackathon team! Use our filters to narrow down groups based on
                the programming language used, their time zone and more!
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer>
            <Button onClick={this.handleClick(1)}>Click to flip</Button>
          </Card>
        </ReactCardFlip>

        <ReactCardFlip
          isFlipped={this.state.flipped.has(2)}
          flipDirection="horizontal"
        >
          <Card>
            {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
            <Card.Body>
              <Card.Title>How To Post Your Group</Card.Title>
              <Card.Text>
                This card has supporting text below as a natural lead-in to
                additional content.
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer>
            <Button onClick={this.handleClick(2)}>Click to flip</Button>
          </Card>
          <Card>
            {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
            <Card.Body>
              <Card.Title>The Back</Card.Title>
              <Card.Text>
                This card has supporting text below as a natural lead-in to
                additional content.
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer>
            <Button onClick={this.handleClick(2)}>Click to flip</Button>
          </Card>
        </ReactCardFlip>

        <ReactCardFlip
          isFlipped={this.state.flipped.has(3)}
          flipDirection="horizontal"
        >
          <Card>
            {/* <Card.Img variant="top" src="../images/groups.webp/100px160" /> */}
            <Card.Body>
              <Card.Title>How To Join A Group</Card.Title>
              <Card.Text>
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer>
            <Button onClick={this.handleClick(3)}>Click to flip</Button>
          </Card>

          <Card>
            {/* <Card.Img variant="top" src="../images/groups.webp/100px160" /> */}
            <Card.Body>
              <Card.Title>The Back</Card.Title>
              <Card.Text>
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer>
            <Button onClick={this.handleClick(3)}>Click to flip</Button>
          </Card>
        </ReactCardFlip>
      </div>
    );
  }
}

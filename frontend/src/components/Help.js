import { Component } from "react";
import React from "react";
import { Button, Card } from "react-bootstrap";
import ReactCardFlip from "react-card-flip";
import Navbar from "components/NavBar";

export default class Help extends Component {
  constructor() {
    super();
    this.state = {
      isFlipped: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.setState((prevState) => ({ isFlipped: !prevState.isFlipped }));
  }

  render() {
    return (
      <div>
        <Navbar renderBool={[false, false, false, false]} helpPage={true} />

        <ReactCardFlip
          isFlipped={this.state.isFlipped}
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
            <Button onClick={this.handleClick}>Click to flip</Button>
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
            <Button onClick={this.handleClick}>Click to flip</Button>
          </Card>
        </ReactCardFlip>

        <ReactCardFlip
          isFlipped={this.state.isFlipped}
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
            <Button onClick={this.handleClick}>Click to flip</Button>
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
            <Button onClick={this.handleClick}>Click to flip</Button>
          </Card>
        </ReactCardFlip>

        <ReactCardFlip
          isFlipped={this.state.isFlipped}
          flipDirection="horizontal"
        >
          <Card>
            {/* <Card.Img variant="top" src="../images/groups.webp/100px160" /> */}
            <Card.Body>
              <Card.Title>What are Hackathons?</Card.Title>
              <Card.Text>
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer>
            <Button onClick={this.handleClick}>Click to flip</Button>
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
            <Button onClick={this.handleClick}>Click to flip</Button>
          </Card>
        </ReactCardFlip>
      </div>
    );
  }
}

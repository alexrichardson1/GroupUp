import React, { Component } from "react";
import axios from "axios";
import "./styles.css";

async function addGroup(data) {
  var result = {};
  await axios
    .post(`"http://localhost:5000/group/add`, data)
    .then((res) => {
      const group = res.data;
      console.log(group);
      result = group;
    })
    .catch((error) => {
      console.log(error);
    });
  return result;
}

export default class CreateGroup extends Component {
  onSubmit = async (event) => {
    event.preventDefault();
    const title = this.title.value;
    const tags = this.tags.value;
    const info = { title: title, tags: [tags] };
    await addGroup(info);
    window.location.reload();
  };

  render() {
    return (
      <div className="formWrap">
        <div className="formContent">
          <form className="form" onSubmit={this.onSubmit}>
            <h1 className="formH1">Enter Session Details</h1>
            <input
              type="text"
              className="formInput"
              placeholder="Title"
              ref={(input) => (this.title = input)}
            />
            <input
              type="text"
              className="formInput"
              placeholder="Tags"
              ref={(input) => (this.tags = input)}
            />
            <button className="createButton">Create Session</button>
          </form>
        </div>
      </div>
    );
  }
}

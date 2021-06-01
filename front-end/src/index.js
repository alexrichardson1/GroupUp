import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

const Index = () => {
  return (
    <React.Fragment>
      <App />
    </React.Fragment>
  );
};

ReactDOM.render(<Index />, document.getElementById("root"));

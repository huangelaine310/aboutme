import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import "./App.css";

import sisyphus from "./images/sisyphus_draft.png";

class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fade: false
    };
  }
  render() {
    var headerClass = "App-header";
    if (this.state.fade) headerClass += " fade";

    return (
      <header className={headerClass}>
        <img src={sisyphus} className="App-logo" alt="logo" />
        <p>Currently Under Construction</p>
      </header>
    );
  }
}

export default Splash;

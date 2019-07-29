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
        <p>just small snippets of my journey.</p>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => this.setState({ fade: true })}
        >
          Enter
        </Button>
      </header>
    );
  }
}

export default Splash;

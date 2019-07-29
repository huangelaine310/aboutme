import React, { Component } from "react";
import "./App.css";
import computer from "./images/computer.jpg";
import classNames from "classnames";

class ProjectSect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }

  render() {
    const style = {
      height: this.state.height,
      width: this.state.width
    };
    return (
      <div className={classNames("Section", "ProjectSect")} style={style}>
        <div className={classNames("SectLeft", "SectImage")}>
          <img src={computer} alt="projects" />
        </div>

        <div className={classNames("SectRight", "SectText")}>
          <div className="SectionText">
            <div className="SectionHeader">Projects</div>
            <div className="SectionContent">
              Coding is my life. Love it, happy to do it, and will continue to
              do more. Check out some of the projects I've worked on here.
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProjectSect;

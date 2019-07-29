import React, { Component } from "react";
import * as d3 from "d3";
import "./App.css";
import sisyphus from "./images/sisyphus_draft.png";

class Bubbles extends Component {
  constructor(props) {
    super(props);

    this.minValue = 50;
    this.maxValue = 100;
    this.mounted = false;

    this.state = {
      data: this.props.data,
      width: window.innerWidth,
      height: window.innerHeight,
      hoverId: -1
    };

    this.radiusScale = this.radiusScale.bind(this);
    this.simulatePositions = this.simulatePositions.bind(this);
    this.renderBubbles = this.renderBubbles.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  updateDimensions() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }

  componentWillMount() {
    this.mounted = true;
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
    if (this.props.data.length > 0) {
      this.minValue =
        0.05 *
        d3.min(this.props.data, item => {
          return item.value;
        });

      this.maxValue =
        1.05 *
        d3.max(this.props.data, item => {
          return item.value;
        });

      this.simulatePositions(this.props.data);
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  radiusScale = value => {
    const fx = d3
      .scaleSqrt()
      .range([50, 90])
      .domain([this.minValue, this.maxValue]);

    return fx(value);
  };

  simulatePositions = data => {
    this.simulation = d3
      .forceSimulation()
      .nodes(data)
      .velocityDecay(0.5)
      .force("x", d3.forceX().strength(0.1))
      .force("y", d3.forceY().strength(0.2))
      .force(
        "collide",
        d3.forceCollide(d => {
          return this.radiusScale(d.value) + 30;
        })
      )
      .on("tick", () => {
        if (this.mounted) {
          this.setState({ data });
        }
      });
  };

  renderBubbles = data => {
    const minValue =
      0.95 *
      d3.min(data, item => {
        return item.value;
      });

    const maxValue =
      1.05 *
      d3.max(data, item => {
        return item.value;
      });

    const color = d3
      .scaleLinear()
      .domain([minValue, maxValue])
      .interpolate(d3.interpolateHcl)
      .range(["#fc4a1a", "#f7b733"]);

    // render circle and text elements inside a group
    const texts = this.state.data.map((item, index) => {
      const width = this.state.width;
      const height = this.state.height;
      const fontSize = this.radiusScale(item.value) / 2;
      if (item.type.valueOf() === "img") {
        return (
          <g
            key={index}
            transform={`translate(${width / 2 + item.x}, ${height / 2 +
              item.y})`}
            className="bubbleGImg"
          >
            <defs>
              <pattern
                id="attachedImage"
                height="100%"
                width="100%"
                patternContentUnits="objectBoundingBox"
              >
                <image
                  xlinkHref={sisyphus}
                  preserveAspectRatio="none"
                  width="1"
                  height="1"
                />
              </pattern>
            </defs>
            <circle
              r={this.radiusScale(item.value)}
              stroke={d3.rgb(color(item.value)).brighter(2)}
              strokeWidth="2"
              className="bubbleImg"
              fill="url(#attachedImage)"
            />
          </g>
        );
      } else {
        return (
          <g
            key={index}
            transform={`translate(${this.state.width / 2 + item.x}, ${this.state
              .height /
              2 +
              item.y})`}
            className="bubbleG"
          >
            <circle
              r={this.radiusScale(item.value)}
              fill={color(item.value)}
              stroke={d3.rgb(color(item.value)).darker(2)}
              strokeWidth="2"
              className="bubble"
            />
            <text
              dy="6"
              fill="#fff"
              textAnchor="middle"
              fontSize={`${fontSize}px`}
              fontWeight="bold"
              className="bubbleText"
            >
              {item.name}
            </text>
          </g>
        );
      }
    });
    return texts;
  };

  render() {
    if (this.state.data.length) {
      return (
        <svg width={this.state.width} height={this.state.height}>
          {this.renderBubbles(this.state.data)}
        </svg>
      );
    }

    return <div>Loading</div>;
  }
}

export default Bubbles;

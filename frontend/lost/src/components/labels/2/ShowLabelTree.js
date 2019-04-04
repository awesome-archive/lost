import React, { Component } from "react";

class ShowLableTree extends Component {
  constructor() {
    super();
  }

  renderTree() {
    return <div>TEST</div>;
  }

  render() {
    return <div>{this.renderTree()}</div>;
  }
}

export default ShowLableTree;

import React, { Component } from "react";
import { Menu, Item, contextMenu } from "react-contexify";

class test extends Component {
  constructor() {
    super();
    this.contextMenuOnClick = this.contextMenuOnClick.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  contextMenuOnClick(e) {
    contextMenu.show({
      id: this.props.idx,
      event: e
    });
  }

  onDelete() {
    this.props.onDelete(this.props.idx);
  }

  render() {
    return (
      <div onClick={this.contextMenuOnClick}>
        <i className="icon-options-vertical icons font-1xl " />
        <Menu id={this.props.idx}>
          <Item onClick={this.onDelete}>
            <span>
              <i className="fa fa-trash fa-lg" /> Delete Group
            </span>
          </Item>
        </Menu>
      </div>
    );
  }
}

export default test;

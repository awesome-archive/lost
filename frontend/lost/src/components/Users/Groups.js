import React, { Component } from "react";
import GroupsTable from "./GroupsTable";
import { connect } from "react-redux";
import { Button } from "reactstrap";
import NewGroupModal from "./modal/newGroup/NewGroupModal";

import actions from "actions";
const { getGroups, createGroup } = actions;
class Groups extends Component {
  constructor() {
    super();
    this.state = {
      modalIsOpen: false
    };
    this.newGroupOnClick = this.newGroupOnClick.bind(this);
    this.modalOnClose = this.modalOnClose.bind(this);
  }

  componentDidMount() {
    this.props.getGroups();
  }

  newGroupOnClick() {
    this.setState({
      modalIsOpen: true
    });
  }

  modalOnClose(newGroupName) {
    this.setState({
      modalIsOpen: false
    });
    this.props.createGroup({
      group_name: newGroupName
    });
    this.props.getGroups();
  }

  render() {
    return (
      <>
        <h3>Groups</h3>
        <Button onClick={this.newGroupOnClick} size="lg" color="primary">
          Add new Group
        </Button>
        <GroupsTable groups={this.props.groups} />
        <NewGroupModal
          isOpen={this.state.modalIsOpen}
          modalOnClose={this.modalOnClose}
        />
      </>
    );
  }
}
function mapStateToProps(state) {
  return {
    groups: state.group.groups
  };
}
export default connect(
  mapStateToProps,
  { getGroups, createGroup }
)(Groups);

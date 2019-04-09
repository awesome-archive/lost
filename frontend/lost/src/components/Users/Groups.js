import React, { Component } from "react";
import GroupsTable from "./GroupsTable";
import { connect } from "react-redux";
import { Button } from "reactstrap";

import actions from "actions";
const { getGroups } = actions;
class Groups extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.getGroups();
  }

  render() {
    return (
      <>
        <h3>Groups</h3>
        <Button size="lg" color="primary">
          Add new Group
        </Button>
        <GroupsTable groups={this.props.groups} />
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
  { getGroups }
)(Groups);

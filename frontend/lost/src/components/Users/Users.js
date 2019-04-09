import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "actions";
import EditUserModal from "./modal/editUser/UserModal";
import UserTable from "./UsersTable";
import { Button } from "reactstrap";
const { getUsers, updateUser, getGroups } = actions;

class Users extends Component {
  constructor() {
    super();
    this.onClickEditUser = this.onClickEditUser.bind(this);
    this.modalOnClose = this.modalOnClose.bind(this);
    this.state = {
      modalIsOpen: false
    };
  }

  componentDidMount() {
    this.props.getUsers();
  }

  onClickEditUser(row) {
    this.setState({
      selectedUser: row,
      modalIsOpen: true
    });
  }

  async modalOnClose(updatedUser) {
    this.setState({
      modalIsOpen: false
    });
    await this.props.updateUser(updatedUser);
    await this.props.getUsers();
    await this.props.getGroups();
  }

  render() {
    return (
      <>
        <h3>Users</h3>
        <Button size="lg" color="primary">
          Add new User
        </Button>
        <UserTable
          users={this.props.users}
          onClickEditUser={this.onClickEditUser}
        />
        <EditUserModal
          isOpen={this.state.modalIsOpen}
          modalOnClose={this.modalOnClose}
          user={this.state.selectedUser}
          allgroups={this.props.allgroups}
        />
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.user.users,
    allgroups: state.group.groups
  };
}

export default connect(
  mapStateToProps,
  { getUsers, updateUser, getGroups }
)(Users);

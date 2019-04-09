import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "actions";
import UserModal from "./modal/user/UserModal";
import UserTable from "./UsersTable";
import { Button } from "reactstrap";
const { getUsers, updateUser, getGroups, createUser } = actions;

class Users extends Component {
  constructor() {
    super();
    this.onClickEditUser = this.onClickEditUser.bind(this);
    this.modalOnClose = this.modalOnClose.bind(this);
    this.onClickEditUser = this.onClickEditUser.bind(this);
    this.onClickNewUser = this.onClickNewUser.bind(this);
    this.state = {
      modalIsOpen: false,
      newUser: undefined
    };
  }

  componentDidMount() {
    this.props.getUsers();
  }

  onClickEditUser(row) {
    this.setState({
      selectedUser: row,
      modalIsOpen: true,
      newUser: false
    });
  }

  onClickNewUser() {
    this.setState({
      modalIsOpen: true,
      newUser: true
    });
  }

  async modalOnClose(payload, user) {
    this.setState({
      modalIsOpen: false
    });
    switch (payload) {
      case "cancel":
        break;
      case "newUser":
        console.log("-----------------user-------------------");
        console.log(user);
        console.log("------------------------------------");
        await this.props.createUser(user);
        break;
      case "updateUser":
        await this.props.updateUser(user);
        break;
      default:
        throw new Error("no payload");
    }
    await this.props.getUsers();
    await this.props.getGroups();
  }

  render() {
    return (
      <>
        <h3>Users</h3>
        <Button onClick={this.onClickNewUser} size="lg" color="primary">
          Add new User
        </Button>
        <UserTable
          users={this.props.users}
          onClickEditUser={this.onClickEditUser}
        />
        <UserModal
          isOpen={this.state.modalIsOpen}
          modalOnClose={this.modalOnClose}
          user={this.state.selectedUser}
          allgroups={this.props.allgroups}
          newUser={this.state.newUser}
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
  { getUsers, updateUser, getGroups, createUser }
)(Users);

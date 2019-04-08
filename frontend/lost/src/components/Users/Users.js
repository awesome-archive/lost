import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "actions";
import EditUserModal from "./modal/editUser/UserModal";
import UserTable from "./UsersTable";
import { Button } from "reactstrap";
const { getUsers } = actions;

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

  modalOnClose(idx, updatedUser) {
    this.setState({
      modalIsOpen: false
    });
  }

  render() {
    return (
      <>
        <UserTable
          users={this.props.users}
          onClickEditUser={this.onClickEditUser}
        />
        <EditUserModal
          isOpen={this.state.modalIsOpen}
          modalOnClose={this.modalOnClose}
          user={this.state.selectedUser}
        />
        <Button size="lg" color="primary">
          Add new User
        </Button>{" "}
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.user.users
  };
}

export default connect(
  mapStateToProps,
  { getUsers }
)(Users);

import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "actions";
import EditUserModal from "./modal/editUser/UserModal";
import UserTable from "./UsersTable";
import GroupsTable from "./GroupsTable";
import { Button, Col, Container, Row } from "reactstrap";
const { getUsers, getGroups } = actions;

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
    this.props.getGroups();
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
      <Container>
        <Row>
          <Col xs="5">
            <h3>Groups</h3>
            <Button size="lg" color="primary">
              Add new Group
            </Button>
            <GroupsTable groups={this.props.groups} />
          </Col>
          <Col xs="7">
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
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  console.log("----------state--------------------------");
  console.log(state);
  console.log("------------------------------------");
  return {
    users: state.user.users,
    groups: state.group.groups
  };
}

export default connect(
  mapStateToProps,
  { getUsers, getGroups }
)(Users);

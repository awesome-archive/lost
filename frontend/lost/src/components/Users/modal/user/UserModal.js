import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Card,
  CardBody,
  Form
} from "reactstrap";
import _ from "lodash";
import EditUserForm from "./EditUserForm";
import NewUserForm from "./NewUserForm";

class UserModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        groups: [],
        roles: []
      }
    };

    this.modalOnClose = this.modalOnClose.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.renderCancelButton = this.renderCancelButton.bind(this);
  }

  //ComponentWillReciveProps is deprecated
  // Load user data to state
  static getDerivedStateFromProps(props, state) {
    // if another item is clicked or the object is empty
    if (props.newUser === false) {
      if (
        (_.isEmpty(state.user) || props.user.idx !== state.user.idx) &&
        props.user
      ) {
        const user = {
          ...props.user,
          groups: props.user.groups.map(el => el.name)
        };
        return {
          // use only allowed keys from object
          user: _.pick(user, [
            "email",
            "first_name",
            "groups",
            "idx",
            "last_name",
            "password",
            "roles"
          ])
        };
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  updateUser(user) {
    this.setState({ user });
  }

  modalOnClose(payload) {
    console.log("------------------------------------");
    console.log(payload);
    console.log("------------------------------------");
    let option = payload;
    if (!option) {
      if (this.props.newUser) {
        option = "newUser";
      } else {
        option = "updateUser";
      }
    }
    const user = this.state.user;

    if (user.user_name && user.email && user.new_password) {
      this.props.modalOnClose(option, user);
    }
  }

  renderForm() {
    console.log("---------jhjhj---------------------------");
    console.log(this.state);
    console.log("------------------------------------");
    if (this.props.newUser) {
      return (
        <NewUserForm
          updateUser={this.updateUser}
          user={this.state.user}
          allgroups={this.props.allgroups}
          usergroups={this.state.user.groups}
        />
      );
    } else {
      return (
        <EditUserForm
          updateUser={this.updateUser}
          user={this.state.user}
          allgroups={this.props.allgroups}
          usergroups={this.state.user.groups}
        />
      );
    }
  }

  renderCancelButton() {
    return (
      <Button color="secondary" onClick={() => this.modalOnClose("cancel")}>
        Cancel
      </Button>
    );
  }

  render() {
    if (this.state.user) {
      return (
        <div>
          <Modal
            size="lg"
            isOpen={this.props.isOpen}
            toggle={() => this.modalOnClose()}
          >
            <ModalHeader>Edit User</ModalHeader>
            <ModalBody>
              <Card>
                <CardBody>
                  <Form className="form-horizontal">{this.renderForm()}</Form>
                </CardBody>
              </Card>
            </ModalBody>
            <ModalFooter>
              {this.renderCancelButton()}
              <Button color="secondary" onClick={() => this.modalOnClose()}>
                Save
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

export default UserModal;

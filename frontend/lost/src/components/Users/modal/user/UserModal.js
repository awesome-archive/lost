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
        return {
          ...props.user,
          groups: props.user.groups.map(el => el.name)
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

  modalOnClose(option) {
    if (option === "cancel") {
      this.props.modalOnClose(option)
    }
    if (this.props.newUser) {
      option = "newUser";
    } else {
      option = "updateUser";
    }

    const user = this.state.user;
    console.log("----------------user--------------------");
    console.log(user);
    console.log("------------------------------------");

    // Create/Update User
    if (user.user_name && user.email && user.new_password) {
      this.props.modalOnClose(option, user);
    }
  }

  renderForm() {
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


  render() {
    console.log("ZZZZZZZz")
    console.log(this.state.user)
    if (this.state.user) {
      return (
        <div>
          <Modal
            size="lg"
            isOpen={this.props.isOpen}
            toggle={() => this.modalOnClose("cancel")}
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
              <Button color="secondary" onClick={() => this.modalOnClose("cancel")}>
                Cancel
              </Button>
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

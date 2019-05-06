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
        roles: ['Designer', 'Annotator']
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
    if(user.email && user.user_name && user.new_password){
      this.setState(
        {
          validated: true,
          user: user
        }
      )
    }else {
      this.setState(
        {
          validated: false,
          user: user
        }
      )
    }
  }

  modalOnClose(option) {
    if (option === "cancel") {
      this.props.modalOnClose()
    }
    if (this.props.newUser) {
      // {"user_name":"aaaa","password":"aaaa","email":"aaaa","groups":[],"roles":["Annotater"]}
    } else {
      // {"idx":6,"email":"ooo","first_name":"aaaaa","last_name":"aaaa","groups":[],"roles":["Annotator","Designer"],"password":"wwwwww"}
    }
    const user = this.state.user;
    // Create/Update User
    if (user.user_name && user.email && user.password) {
      this.props.createUser(user)
      this.props.modalOnClose();
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
    if (this.state.user) {
      return (
        <div>
          <Modal
            size="lg"
            isOpen={this.props.isOpen}
            toggle={() => this.modalOnClose("cancel")}
          >
            <ModalHeader>{this.props.newUser?'Add new user':'Edit User'}</ModalHeader>
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

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

import Email from "./fields/Email";
import FirstName from "./fields/FirstName";
import Groups from "./fields/Groups";
import LastName from "./fields/LastName";
import Password from "./fields/Password";
import Roles from "./fields/Roles";

const allowed = [
  "email",
  "first_name",
  "groups",
  "idx",
  "last_name",
  "password",
  "roles"
];

class UserModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
    this.modalOnClose = this.modalOnClose.bind(this);
  }

  //ComponentWillReciveProps is deprecated
  static getDerivedStateFromProps(props, state) {
    // if another item is clicked or the object is empty
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
        user: _.pick(user, allowed)
      };
    } else {
      return null;
    }
  }

  modalOnClose() {
    this.props.modalOnClose(this.state.user);
  }

  render() {
    if (this.state.user) {
      return (
        <div>
          <Modal
            size="lg"
            isOpen={this.props.isOpen}
            toggle={this.modalOnClose}
          >
            <ModalHeader>Edit User</ModalHeader>
            <ModalBody>
              <Card>
                <CardBody>
                  <Form className="form-horizontal">
                    <Email
                      value={this.state.user.email}
                      onChange={e => {
                        const value = e.target.value;
                        this.setState({
                          user: {
                            ...this.state.user,
                            email: value
                          }
                        });
                      }}
                    />
                    <FirstName
                      value={this.state.user.first_name}
                      onChange={e => {
                        const value = e.target.value;
                        this.setState({
                          user: {
                            ...this.state.user,
                            first_name: value
                          }
                        });
                      }}
                    />
                    <LastName
                      value={this.state.user.last_name}
                      onChange={e => {
                        const value = e.target.value;
                        this.setState({
                          user: {
                            ...this.state.user,
                            last_name: value
                          }
                        });
                      }}
                    />
                    <Password
                      value={this.state.user.new_password}
                      onChange={e => {
                        const value = e.target.value;
                        this.setState({
                          user: {
                            ...this.state.user,
                            new_password: value
                          }
                        });
                      }}
                    />
                    <Groups
                      usergroups={this.state.user.groups}
                      allgroups={this.props.allgroups}
                      onChange={newGroups => {
                        this.setState({
                          user: {
                            ...this.state.user,
                            groups: newGroups
                          }
                        });
                      }}
                    />
                    <Roles />
                  </Form>
                </CardBody>
              </Card>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={this.modalOnClose}>
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

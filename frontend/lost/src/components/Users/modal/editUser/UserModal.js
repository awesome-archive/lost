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

import Email from "./fields/Email";
import FirstName from "./fields/FirstName";
import Groups from "./fields/Groups";
import LastName from "./fields/LastName";
import Password from "./fields/Password";
import Roles from "./fields/Roles";

class UserModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  //ComponentWillReciveProps is deprecated
  static getDerivedStateFromProps(nextProps) {
    return {
      user: nextProps.user
    };
  }
  render() {
    if (this.state.user) {
      return (
        <div>
          <Modal
            size="lg"
            isOpen={this.props.isOpen}
            toggle={this.props.modalOnClose}
            className={this.props.className}
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
                          user: { email: value }
                        });
                      }}
                    />
                    <FirstName
                      value={this.state.user.first_name}
                      onChange={e => {
                        const value = e.target.value;
                        this.setState({
                          user: { first_name: value }
                        });
                      }}
                    />
                    <LastName
                      value={this.state.user.last_name}
                      onChange={e => {
                        const value = e.target.value;
                        this.setState({
                          user: { last_name: value }
                        });
                      }}
                    />
                    <Password
                      value={this.state.user.new_password}
                      onChange={e => {
                        const value = e.target.value;
                        this.setState({
                          user: { new_password: value }
                        });
                      }}
                    />
                    <Groups />
                    <Roles />
                  </Form>
                </CardBody>
              </Card>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={this.props.modalOnClose}>
                Cancel
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

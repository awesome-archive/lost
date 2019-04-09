import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Card,
  CardBody,
  Form,
  FormGroup,
  Col,
  Label,
  Input
} from "reactstrap";

class NewGroupModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newGroupName: ""
    };
    this.onChange = this.onChange.bind(this);
    this.modalOnClose = this.modalOnClose.bind(this);
  }

  onChange(e) {
    this.setState({
      newGroupName: e.target.value
    });
  }

  modalOnClose() {
    this.props.modalOnClose(this.state.newGroupName);
  }

  render() {
    return (
      <div>
        <Modal size="lg" isOpen={this.props.isOpen} toggle={this.modalOnClose}>
          <ModalHeader>New Group</ModalHeader>
          <ModalBody>
            <Card>
              <CardBody>
                <Form className="form-horizontal">
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor={`newGroup-name`}>Group Name</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        defaultValue={this.state.newGroupName}
                        onChange={this.onChange}
                        id={`newGroup-name`}
                        name={`newGroup-name`}
                        placeholder={`Enter Group Name...`}
                      />
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.modalOnClose}>
              Add
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default NewGroupModal;

import React, { Component } from "react";
import Select from "react-select";
import _ from "lodash";
import { FormGroup, Col, Input, FormText, Label } from "reactstrap";

const allowed = ["idx", "label"];

class Groups extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange = selectedOption => {
    const selected = selectedOption.map(el => el.value);
    this.props.onChange(selected);
  };

  render() {
    return (
      <FormGroup row>
        <Col md="3">
          <Label>Groups</Label>
        </Col>
        <Col xs="12" md="9">
          <Select
            isMulti
            value={this.props.usergroups.map(group => {
              return { value: group, label: group };
            })}
            onChange={this.handleChange}
            options={this.props.allgroups.map(el => {
              return { value: el.name, label: el.name };
            })}
          />
        </Col>
      </FormGroup>
    );
  }
}

export default Groups;

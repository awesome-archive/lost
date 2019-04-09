import React from "react";
import { FormGroup, Col, Input, Label } from "reactstrap";

export default props => {
  const { onChange, value } = props;
  return (
    <FormGroup row>
      <Col md="3">
        <Label htmlFor={`users-username`}>Username</Label>
      </Col>
      <Col xs="12" md="9">
        <Input
          defaultValue={value}
          onChange={onChange}
          id={`users-username`}
          name={`users-username`}
          placeholder={`Enter Username...`}
        />
      </Col>
    </FormGroup>
  );
};

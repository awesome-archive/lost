import React from "react";
import { FormGroup, Col, Input, FormText, Label } from "reactstrap";

export default props => {
  const { onChange, value } = props;
  return (
    <FormGroup row>
      <Col md="3">
        <Label htmlFor={`users-lastName`}>Last Name</Label>
      </Col>
      <Col xs="12" md="9">
        <Input
          defaultValue={value}
          onChange={onChange}
          type="lastName"
          id={`users-lastName`}
          name={`users-lastName`}
          placeholder={`Enter lastName...`}
        />
      </Col>
    </FormGroup>
  );
};

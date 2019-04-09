import React from "react";
import { FormGroup, Col, Input, FormText, Label } from "reactstrap";

export default props => {
  const { onChange, value } = props;
  return (
    <FormGroup row>
      <Col md="3">
        <Label htmlFor={`users-password`}>Password</Label>
      </Col>
      <Col xs="12" md="9">
        <Input
          defaultValue={value}
          onChange={onChange}
          type="password"
          id={`users-password`}
          name={`users-password`}
          placeholder={`Enter password...`}
        />
      </Col>
    </FormGroup>
  );
};

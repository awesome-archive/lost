import React from "react";
import { FormGroup, Col, Input, FormText, Label } from "reactstrap";

export default props => {
  const { onChange, value } = props;
  return (
    <FormGroup row>
      <Col md="3">
        <Label htmlFor={`editUser-password`}>Password</Label>
      </Col>
      <Col xs="12" md="9">
        <Input
          defaultValue={value}
          onChange={onChange}
          type="password"
          id={`editUser-password`}
          name={`editUser-password`}
          placeholder={`Enter password...`}
        />
      </Col>
    </FormGroup>
  );
};

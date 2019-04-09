import React from "react";
import { FormGroup, Col, Input, FormText, Label } from "reactstrap";

export default props => {
  const { onChange, value } = props;
  return (
    <FormGroup row>
      <Col md="3">
        <Label htmlFor={`editUser-email`}>Email</Label>
      </Col>
      <Col xs="12" md="9">
        <Input
          defaultValue={value}
          onChange={onChange}
          type="email"
          id={`editUser-email`}
          name={`editUser-email`}
          placeholder={`Enter Email...`}
        />
      </Col>
    </FormGroup>
  );
};

import React from "react";
import { Row, Col, Card, CardBody } from "reactstrap";
export default props => {
  return (
    <Row>
      <Col xs="12" sm="12" lg="12">
        <Card>
          <CardBody>{props.children}</CardBody>
        </Card>
      </Col>
    </Row>
  );
};

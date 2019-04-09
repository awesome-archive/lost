import React from "react";
import Users from "../components/Users/Users";
import Groups from "../components/Users/Groups";
import { Row, Col, Card, CardBody, Container } from "reactstrap";
export default () => {
  return (
    <Container>
      <Row>
        <Col xs="4">
          <Card>
            <CardBody>
              <Groups />
            </CardBody>
          </Card>
        </Col>
        <Col xs="8">
          <Card>
            <CardBody>
              <Users />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

import React from 'react';
import styled from 'styled-components';
import { Form, Jumbotron, Container, Row, Col, Card } from 'react-bootstrap';
import StepsForm from './StepsForm';
import Strings from '../../../../Strings';

const ContainerF = styled.div`
    position: absolute;
    top: 5%;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    padding: .5rem !important; 
`;

const ContainerForm = ({ step, handleInputChange, values, nextStep, prevStep }) => {
  const handleSubmit = e => {
    e.preventDefault();
  };

  let titleForm;
  if (step === 1) {
    titleForm = Strings.titleTeacherList;
  } else if (step === 2) {
    titleForm = Strings.titleSelectDate;
  } else if (step === 3) {
    titleForm = Strings.titleEmailConfirm;
  } else if (step === 4) {
    titleForm = Strings.titleDateConfirm;
  }

  return (
    <ContainerF>
      <Container>
        <Jumbotron> <h1>{titleForm}</h1> </Jumbotron>
        <Row>
          <Col lg={{ span: 10, offset: 1 }}>
            <Card>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <StepsForm
                    step={step}
                    handleInputChange={handleInputChange}
                    values={values}
                    nextStep={nextStep}
                    prevStep={prevStep}
                  />
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </ContainerF>
  );
};

export default ContainerForm;

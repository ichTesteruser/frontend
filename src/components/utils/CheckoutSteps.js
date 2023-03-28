import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faDolly, faLock, faTruck } from '@fortawesome/free-solid-svg-icons';

//? Bootstrap component

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export default function CheckoutSteps(props) {
  return (
    <Row className="checkout-steps">
      <Col className={props.step1 ? 'active' : ''}>
        <FontAwesomeIcon icon={faLock} ></FontAwesomeIcon>{' '}
          Sign-In
      </Col>
      <Col className={props.step2 ? 'active' : ''}>
        <FontAwesomeIcon icon={faTruck} ></FontAwesomeIcon>{' '}
          Shipping
      </Col>
      <Col className={props.step3 ? 'active' : ''}>
        <FontAwesomeIcon icon={faCreditCard} ></FontAwesomeIcon>{' '}
          Payment
      </Col>
      <Col className={props.step4 ? 'active' : ''}>
        <FontAwesomeIcon icon={faDolly} ></FontAwesomeIcon>{' '}
          Submit Order
      </Col>
    </Row>
  );
}

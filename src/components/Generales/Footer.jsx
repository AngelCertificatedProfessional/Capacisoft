import React from 'react';
import {Navbar,Nav} from 'react-bootstrap';
import {withRouter } from 'react-router-dom';

const Footer = () => {
  return (
    <Navbar bg="dark" variant="dark" fixed="bottom" expand="lg">
      <Nav className="me-auto">
          <Navbar.Text className="ml-3">
              LiutsEducation.org
          </Navbar.Text>
      </Nav>   
    </Navbar>
  );
};

export default withRouter(Footer);

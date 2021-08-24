import React from 'react';
import {Navbar,Nav} from 'react-bootstrap';
import {withRouter } from 'react-router-dom';

const Footer = () => {
  return (
    <Navbar bg="dark" variant="dark" fixed="bottom" expand="lg">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
                <Navbar.Text className="ml-3">
                    LiutsEducation.org
                </Navbar.Text>
            </Nav>   
        </Navbar.Collapse> 
    </Navbar>
  );
};

export default withRouter(Footer);

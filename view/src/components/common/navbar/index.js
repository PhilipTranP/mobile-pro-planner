import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Navlink from './Navlink';
import { name } from '../../../../config.js';


const NavBar = props => (
  <Navbar collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to="/">{name}</Link>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav pullRight>
        {!props.loggedIn && [
          <Navlink url="/login" text="Login" key="login" />,
          <Navlink url="/register" text="Register" key="register" />
        ]}
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

NavBar.propTypes = {
  loggedIn: PropTypes.bool
};

const mapStateToProps = ({user}) => {
  return {loggedIn: user.isLoggedIn};
};

export default connect(mapStateToProps)(NavBar);

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Navbar, Nav, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Navlink from './Navlink';
import { name } from '../../../../config.js';
import { logout } from '../../../actions/userActions';


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
        {(!props.loggedIn && [
          <Navlink url="/login" text="Login" key="login" />,
          <Navlink url="/register" text="Register" key="register" />
        ]) || (
          <NavDropdown title="menu" id="Menu">
            <MenuItem header>{props.user && props.user.employee.name}</MenuItem>
            <MenuItem divider />
            <MenuItem onSelect={()=>props.history.push('/')}>Home</MenuItem>
            <MenuItem divider />
            <MenuItem onSelect={props.logout}>Logout</MenuItem>

          </NavDropdown>
        )}
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

NavBar.propTypes = {
  loggedIn: PropTypes.bool,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = ({user}, {history}) => {
  return {
    loggedIn: user.isLoggedIn,
    user: user.user,
    history
  };
};

const mapDispatchToProps = (dispatch, {history}) =>
  bindActionCreators({
    logout: logout(history)
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);

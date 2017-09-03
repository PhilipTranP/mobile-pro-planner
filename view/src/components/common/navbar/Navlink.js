import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const Navlink = props => (
  <li>
    <NavLink to={props.url} className="nav-link" activeClassName="active">
      {props.text}
    </NavLink>
  </li>
);

Navlink.propTypes = {
  url: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

export default Navlink;

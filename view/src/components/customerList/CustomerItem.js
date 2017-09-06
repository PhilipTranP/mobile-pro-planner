import React from 'react';
import PropTypes from 'prop-types';
import { ListGroupItem } from 'react-bootstrap';


const CustomerItem = props => (
  <ListGroupItem onClick={props.onCustomerClick}
                 id={props.customer.id}>
    {props.customer.name}
  </ListGroupItem>
);

CustomerItem.propTypes = {
  customer: PropTypes.object.isRequired,
  onCustomerClick: PropTypes.func.isRequired
};

export default CustomerItem;

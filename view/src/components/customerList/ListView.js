import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup } from 'react-bootstrap';
import CustomerItem from './CustomerItem';


const ListView = props => (
  <ListGroup>
    {props.customers && props.customers.map(customer => (
      <CustomerItem customer={customer}
                    onCustomerClick={props.onCustomerClick}
                    key={customer.id} />
    ))}
  </ListGroup>
);

ListView.propTypes = {
  customers: PropTypes.array,
  onCustomerClick: PropTypes.func.isRequired
};

export default ListView;

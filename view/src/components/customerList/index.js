import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCustomers } from '../../actions/customerActions';
import ListView from './ListView';
import FontAwesome from 'react-fontawesome';


class CustomerList extends Component {
  static propTypes = {
    customers: PropTypes.array,
    getCustomers: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
  };

  componentDidMount() {
    if(!this.props.customers.length) this.props.getCustomers();
  }

  navToCustomer = evt =>
    this.props.history.push(`/customer/${evt.target.id}`);

  render() {
    if(this.props.customers && this.props.customers.length) return (
      <ListView customers={this.props.customers}
                onCustomerClick={this.navToCustomer} />
    );
    else return (
      <FontAwesome name="spinner" spin />
    );
  }
}

const mapStateToProps = (state, {history}) => {
  return {
    history,
    customers: state.customers.customers,
    fetching: state.customers.fetching
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({getCustomers}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CustomerList);

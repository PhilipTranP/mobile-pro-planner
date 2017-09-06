import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addCustomer } from '../../actions/customerActions';
import AddForm from './AddForm';

class AddCustomer extends Component {
  static propTypes = {
    addCustomer: PropTypes.func.isRequired
  };

  state = {
    name: ''
  };

  onChangeName = evt => {
    this.setState({name: evt.target.value});

  }

  onSubmitCustomer = evt => {
    evt.preventDefault();
    debugger;
    this.props.addCustomer(this.state);
  }

  render() {
    return (
      <AddForm name={this.state.name}
               onSubmitCustomer={this.onSubmitCustomer}
               onChangeName={this.onChangeName} />
    );
  }
}

const mapStateToProps = state => {
  return {

  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    addCustomer
  }, dispatch);

  export default connect(mapStateToProps, mapDispatchToProps)(AddCustomer);

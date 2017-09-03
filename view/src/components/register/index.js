import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { register } from '../../actions/userActions';
import { flashMessage } from '../../actions/alertActions';
import RegisterForm from './RegisterForm.js';

class Register extends Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool,
    fetching: PropTypes.bool,
    history: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    flashMessage: PropTypes.func.isRequired
  };

  state = {
    username: '',
    password: '',
    code: '',
    passcheck: ''
  };

  componentWillMount() {
    if(this.props.isLoggedIn) {
      this.props.flashMessage('warning', 'You are logged in');
      this.props.history.push('/');
    }
  }

  onChangeUsername = evt => this.setState({username: evt.target.value});

  onChangePassword = evt => this.setState({password: evt.target.value});

  onChangeCode = evt => this.setState({code: evt.target.value});

  onChangePasscheck = evt => this.setState({passcheck: evt.target.value});

  onSubmitForm = evt => {
    evt.preventDefault();
    if(this.props.fetching) return;
    this.state.password === this.state.passcheck ?
      this.props.register({...this.state}) :
      this.props.flashMessage('danger', 'Passwords do not match');
  }

  render() {
    return (
      <RegisterForm code={this.state.code}
                    username={this.state.username}
                    password={this.state.password}
                    passcheck={this.state.passcheck}
                    onChangeCode={this.onChangeCode}
                    onChangePassword={this.onChangePassword}
                    onChangePasscheck={this.onChangePasscheck}
                    onChangeUsername={this.onChangeUsername}
                    onSubmitForm={this.onSubmitForm}
                    fetching={this.props.fetching} />
    );
  }
}



const mapStateToProps = ({user}, {history}) => {
  return {
    history,
    isLoggedIn: user.isLoggedIn,
    fetching: user.fetching
  };
};

const mapDispatchToProps = (dispatch, {history}) =>
  bindActionCreators({
    register: register(history),
    flashMessage
  }, dispatch);

  export default connect(mapStateToProps, mapDispatchToProps)(Register);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { login } from '../../actions/userActions';
import { flashMessage } from '../../actions/alertActions';
import LoginForm from './LoginForm';


class Login extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
    flashMessage: PropTypes.func.isRequired,
    fetching: PropTypes.bool
  };

  state = {
    username: '',
    password: ''
  };

  onChangeUsername = evt => this.setState({username: evt.target.value});

  onChangePassword = evt => this.setState({password: evt.target.value});

  onSubmitLogin = evt => {
    evt.preventDefault();
    if(!(this.state.username && this.state.password))
      return this.props.flashMessage('danger', 'All fields required');
    if(this.props.fetching) return;
    this.props.login(this.state);
  }

  render() {
    return (
      <LoginForm username={this.state.username}
                 password={this.state.password}
                 onSubmitLogin={this.onSubmitLogin}
                 onChangeUsername={this.onChangeUsername}
                 onChangePassword={this.onChangePassword}
                 fetching={this.props.fetching} />
    );
  }
}

const mapStateToProps = ({user}) => {
  return {fetching: user.fetching};
};

const mapDispatchToProps = (dispatch, {history}) =>
  bindActionCreators({
    flashMessage,
    login: login(history)
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);

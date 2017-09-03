import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import RouterOutput from './Routes';
import Navbar from './common/navbar';
import Alerts from './common/Alerts';
import { checkForLogin } from '../actions/userActions';


class App extends Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool,
    checkForLogin: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
  }

  componentDidMount() {
    if(!this.props.isLoggedIn) this.props.checkForLogin();
  }

  render() {
    return (
      <div>
        <Navbar history={this.props.history} />
        <Alerts />
        <RouterOutput history={this.props.history} />
      </div>
    );
  }
}

const mapStateToProps = ({user}) => {
  return {
    isLoggedIn: user.isLoggedIn
  };
};

const mapDispatchToProps = (dispatch, {history}) =>
  bindActionCreators({
    checkForLogin: checkForLogin(history)
  }, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

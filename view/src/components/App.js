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
    user: PropTypes.object,
    checkForLogin: PropTypes.func.isRequired
  }

  componentDidMount() {
    if(!this.props.user.isLoggedIn) this.props.checkForLogin();
  }

  render() {
    return (
      <div>
        <Navbar />
        <Alerts />
        <RouterOutput />
      </div>
    );
  }
}

const mapStateToProps = ({user}) => {
  return {user};
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({checkForLogin}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

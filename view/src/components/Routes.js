import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import Login from './login';
import Register from './register';

class Routes extends Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool
  }

  render() {
    return (
      <div className="container">
        <Switch>
          <Route exact path="/" render={()=> <h1>home</h1>} />
          {!this.props.isLoggedIn && [
            <Route path="/login" component={Login} key="login" />,
            <Route path="/register" component={Register} key="register" />
          ]}
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.user.isLoggedIn
  };
};

export default withRouter(connect(mapStateToProps)(Routes));

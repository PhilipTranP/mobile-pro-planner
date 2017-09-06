import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import Login from './login';
import Register from './register';
import Dashboard from './dashboard';
import AddCustomer from './addCustomer';
import CustomerList from './customerList';

class Routes extends Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool,
    permissions: PropTypes.number
  }

  render() {
    return (
      <div className="container">
        <Switch>
          <Route exact path="/" render={()=> <h1>home</h1>} />
          {(this.props.permissions &&
            <Route exact path="/customer" component={CustomerList} />
          )}
          {(this.props.permissions && this.props.permissions > 1 &&
            <Route path="/customer/add" component={AddCustomer} />
          )}
          {!this.props.isLoggedIn && [
            <Route path="/login" component={Login} key="login" />,
            <Route path="/register" component={Register} key="register" />
          ] ||
            <Route path="/dashboard" component={Dashboard} />
          }
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    permissions: state.user.user.permissions
  };
};

export default withRouter(connect(mapStateToProps)(Routes));

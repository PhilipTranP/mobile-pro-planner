import React from 'react';
import PropTypes from 'prop-types';
import {
  Col,
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
  Row
} from 'react-bootstrap';


const LoginForm = props => (
  <Row>
    <Col md={4} />
    <Col md={4}>
      <form className="form" onSubmit={props.onSubmitLogin}>
        <FormGroup controlId="username">
          <ControlLabel srOnly>Username</ControlLabel>
          <FormControl type="text"
                       value={props.username}
                       onChange={props.onChangeUsername}
                       placeholder="Username" />
        </FormGroup>
        <FormGroup controlId="password">
          <ControlLabel srOnly>Password</ControlLabel>
          <FormControl type="password"
                       value={props.password}
                       onChange={props.onChangePassword}
                       placeholder="Password" />
        </FormGroup>
        <span>
          <Button bsStyle="success" type="submit">Login</Button>
        </span>
      </form>
    </Col>
  </Row>
);

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onChangeUsername: PropTypes.func.isRequired,
  onChangePassword: PropTypes.func.isRequired,
  onSubmitLogin: PropTypes.func.isRequired,
  fetching: PropTypes.bool.isRequired
};

export default LoginForm;

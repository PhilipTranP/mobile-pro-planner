import React from 'react';
import PropTypes from 'prop-types';
import {
  Col,
  FormGroup,
  FormControl,
  ControlLabel,
  Button
} from 'react-bootstrap';


const RegisterForm = props => (
  <Col md={4}>
    <form onSubmit={props.onSubmitForm}>
      <FormGroup controlId="code">
        <ControlLabel srOnly>Invite Code</ControlLabel>
        <FormControl type="text"
                     value={props.code}
                     onChange={props.onChangeCode}
                     placeholder="Invite Code" />
      </FormGroup>
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
      <FormGroup controlId="passcheck">
        <ControlLabel srOnly>Re-Enter Password</ControlLabel>
        <FormControl type="password"
                     value={props.passcheck}
                     onChange={props.onChangePasscheck}
                     placeholder="Re-Enter Password" />
      </FormGroup>
      <span className="pull-right">
        <Button bsStyle="success"
                type="submit"
                disabled={!(
                  props.code &&
                  props.username &&
                  props.password &&
                  props.password === props.passcheck &&
                  !props.fetching
                )}>
          Submit
        </Button>
      </span>
    </form>
  </Col>
);

RegisterForm.propTypes = {
  code: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  passcheck: PropTypes.string.isRequired,
  fetching: PropTypes.bool,
  onChangeCode: PropTypes.func.isRequired,
  onChangeUsername: PropTypes.func.isRequired,
  onChangePassword: PropTypes.func.isRequired,
  onChangePasscheck: PropTypes.func.isRequired,
  onSubmitForm: PropTypes.func.isRequired
};

export default RegisterForm;

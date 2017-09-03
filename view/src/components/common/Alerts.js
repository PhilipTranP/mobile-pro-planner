import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Alert, Grid } from 'react-bootstrap';
import { closeMessage } from '../../actions/alertActions';


const Alerts = props => (
  <Grid>
    {props.alerts && props.alerts.map(alert => (
      <Alert bsStyle={alert.style} key={alert.id} onDismiss={()=>props.closeMessage(alert.id)}>
        {alert.message}
      </Alert>
    ))}
  </Grid>
);

Alerts.propTypes = {
  alerts: PropTypes.array,
  closeMessage: PropTypes.func.isRequired
};

const mapStateToProps = ({alerts}) => {
  return {alerts};
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({closeMessage}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Alerts);

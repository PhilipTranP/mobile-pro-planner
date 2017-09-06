import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getSchedule } from '../../actions/scheduleActions';
import BigCalender from 'react-big-calendar';


class Dashboard extends Component {
  static propTypes = {
    permissions: PropTypes.number,
    history: PropTypes.object.isRequired,
    schedule: PropTypes.object,
    getSchedule: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { schedule } = this.props;
    if(!(schedule && schedule.appointments.length)) this.props.getSchedule();
  }

  render() {
    const { schedule } = this.props;
    return (
      <div className="calender-container">
        <h1>Schedule</h1>
        <BigCalender events={(schedule && schedule.appointments) || []}
                     startAccessor="startDate"
                     endAccessor="endDate" />
      </div>
    );
  }

}

const mapStateToProps = (state, {history}) => {
  return {
    permissions: state.user.permissions,
    schedule: state.schedule,
    history
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getSchedule
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

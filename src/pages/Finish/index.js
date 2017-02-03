import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Finish from '../../components/Finish';
import {
  retrieveDDayFromEventDates,
} from '../../utils';

const mapStateToProps = state => ({
  event: state.participate,
  dDay: retrieveDDayFromEventDates(state.participate.get('eventDateList')),
});
class Success extends React.Component {

  render() {
    return (
      <div className="yk-container">
        <Finish
          event={this.props.event}
          dDay={this.props.dDay}
        />
      </div>
    );
  }
}

Success.propTypes = {
  event: PropTypes.object,
  dDay: PropTypes.object,
};

export default connect(mapStateToProps)(Success);

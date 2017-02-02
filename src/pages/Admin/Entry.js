import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import ResultList from './ResultList';
import Spacing from '../../components/Spacing';
import {
  retrieveParticipantUserUUIDs,
  retrieveDDayFromEventDates,
  formatUnixSecondToDate,
} from '../../utils';

const mapStateToProps = state => ({
  title: state.admin.get('title'),
  description: state.admin.get('description'),
  location: state.admin.get('location'),
  unavailableList: state.admin.get('unavailableParticipantList'),
  participantUUIDs: retrieveParticipantUserUUIDs(state.admin.get('eventDateList')),
  dDay: retrieveDDayFromEventDates(state.admin.get('eventDateList')),
});
class Entry extends React.Component {

  get optionalFields() {
    let key = 0;
    return [
      (<div className="yk-page-desc" key={key++}>{this.props.description}</div>),
      (<div className="yk-page-desc" key={key++}>{this.props.location}</div>)
    ];
  }

  get countFields() {
    let key = 0;
    return [
      (<div className="yk-page-desc" key={key++}>
        {`已参加人数: ${this.props.participantUUIDs.length}`}
      </div>),
      (<div className="yk-page-desc" key={key++}>
        {`无法参加人数: ${this.props.unavailableList.size}`}
      </div>),
    ];
  }

  get dDayField() {
    if (this.props.dDay) {
      return (
        <div className="yk-page-desc">
          {`${formatUnixSecondToDate(this.props.dDay.get('timeInUnix'))}`}
        </div>
      );
    }

    return null;
  }

  render() {
    return (
      <div>
        <div className="yk-title-container">
          <div className="yk-page-title">{this.props.title}</div>
          {this.dDayField}
          <Spacing px={5} />
          {this.optionalFields}
          {this.countFields}
        </div>
        <Spacing />
        <ResultList />
      </div>
    );
  }
}

Entry.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  location: PropTypes.string,
  unavailableList: PropTypes.object,
  participantUUIDs: PropTypes.array,
  dDay: PropTypes.object,
};

export default connect(mapStateToProps)(Entry);

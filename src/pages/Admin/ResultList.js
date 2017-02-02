import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  Form,
  CellsTitle,
  FormCell,
  CellBody,
  CellFooter,
  Radio,
} from 'react-weui';
import {
  retrieveParticipantUserUUIDs,
  retrieveMaxParticipantEventDates,
} from '../../utils';
import './style.less';

const mapStateToProps = state => ({
  dateList: state.admin.get('eventDateList'),
  participantUUIDs: retrieveParticipantUserUUIDs(state.admin.get('eventDateList')),
  unavailableList: state.admin.get('unavailableParticipantList'),
});
class ResultList extends React.Component {
  get list() {
    const maxDates = retrieveMaxParticipantEventDates(this.props.dateList);
    let key = 0;
    const sum = this.props.participantUUIDs.length + this.props.unavailableList.size;
    return this.props.dateList.map((eventDate) => {
      const maxDateIdx = maxDates.findIndex(date => date.get('uuid') === eventDate.get('uuid'));
      const checked = maxDateIdx > -1 ?
        (<Radio className="yk-admin-result-checked" name="radio1" value="1" defaultChecked />)
        : null;
      return (
        <FormCell radio key={key++}>
          <CellBody className="yk-admin-result-cell">
            {moment.unix(eventDate.get('timeInUnix')).utcOffset(8).format('YYYY年MM月DD日')}
            {checked}
            <span className="yk-admin-result-ratio">{`${eventDate.get('eventParticipantList').size}/${sum}`}</span>
          </CellBody>
          <CellFooter className="yk-cell-access-footer" />
        </FormCell>
      );
    });
  }

  render() {
    return (
      <div>
        <CellsTitle>统计结果</CellsTitle>
        <Form radio>
          {this.list}
        </Form>
      </div>
    );
  }
}

ResultList.propTypes = {
  dateList: PropTypes.object,
  participantUUIDs: PropTypes.array,
  unavailableList: PropTypes.object,
}

export default connect(mapStateToProps)(ResultList);

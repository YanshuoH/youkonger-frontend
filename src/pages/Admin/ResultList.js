import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
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
  retrieveDDayFromEventDates,
} from '../../utils';
import {
  showEventDateDetail,
} from '../../redux/actions/admin';
import './style.less';

const mapStateToProps = state => ({
  dateList: state.admin.get('eventDateList'),
  participantUUIDs: retrieveParticipantUserUUIDs(state.admin.get('eventDateList')),
  unavailableList: state.admin.get('unavailableParticipantList'),
  dDay: retrieveDDayFromEventDates(state.admin.get('eventDateList')),
});
class ResultList extends React.Component {

  constructor(props) {
    super(props);

    this.onCellClick = this.onCellClick.bind(this);
  }

  onCellClick(eventDate) {
    this.props.dispatch(showEventDateDetail(eventDate));
  }

  get list() {
    const maxDates = retrieveMaxParticipantEventDates(this.props.dateList);
    let key = 0;
    const sum = this.props.participantUUIDs.length + this.props.unavailableList.size;

    return this.props.dateList.map((eventDate) => {
      const maxDateIdx = maxDates.findIndex(date => date.get('uuid') === eventDate.get('uuid'));
      const checked = maxDateIdx > -1 ?
        (<Radio className="yk-admin-result-checked" name="radio1" value="1" defaultChecked />)
        : null;
      const klass = classnames('yk-admin-result-cell', {
        'yk-bold': this.props.dDay && this.props.dDay.get('uuid') === eventDate.get('uuid'),
      });
      return (
        <FormCell radio key={key++} onClick={() => { this.onCellClick(eventDate); }}>
          <CellBody className={klass}>
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
  dispatch: PropTypes.func,
  dDay: PropTypes.object,
};

export default connect(mapStateToProps)(ResultList);

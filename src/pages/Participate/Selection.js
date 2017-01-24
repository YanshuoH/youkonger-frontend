import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  CellsTitle,
  Form,
  Cell,
  CellHeader,
  Checkbox,
  CellBody,
  CellFooter,
  Badge,
} from 'react-weui';
import {
  showEventDateDetail,
  checkEventDate,
} from '../../redux/actions/participate';

const mapStateToProps = state => ({
  dates: state.participate.get('eventDateList'),
});
class Selection extends React.Component {
  constructor(props) {
    super(props);
    this.onCheckboxClick = this.onCheckboxClick.bind(this);
    this.onDateBodyClick = this.onDateBodyClick.bind(this);
  }

  onCheckboxClick(eventDate, idx) {
    this.props.dispatch(checkEventDate(idx));
  }

  onDateBodyClick(eventDate) {
    this.props.dispatch(showEventDateDetail(eventDate));
  }

  get dateList() {
    let key = 0;
    return this.props.dates.map((eventDate, idx) => {
      const badge = eventDate.get('eventParticipantList').isEmpty() ?
        null : (<Badge preset="body">{eventDate.get('eventParticipantList')}</Badge>);

      const checked = !!eventDate.get('checked');
      return (
        <Cell key={key++}>
          <CellHeader onClick={() => { this.onCheckboxClick(eventDate, idx); }}>
            <Checkbox name={eventDate.get('uuid')} checked={checked} />
          </CellHeader>
          <CellBody onClick={() => { this.onDateBodyClick(eventDate); }}>
            {moment.unix(eventDate.get('timeInUnix')).utcOffset(8).format('YYYY年MM月DD日')}
            {badge}
          </CellBody>
          <CellFooter
            onClick={() => { this.onDateBodyClick(eventDate); }}
            className="yk-cell-access-footer"
          />
        </Cell>
      );
    });
  }
  render() {
    return (
      <div>
        <CellsTitle>选择有空的时间</CellsTitle>
        <Form checkbox>
          {this.dateList}
        </Form>
      </div>
    );
  }
}

Selection.propTypes = {
  dates: PropTypes.object,
  dispatch: PropTypes.func,
};

export default connect(mapStateToProps)(Selection);

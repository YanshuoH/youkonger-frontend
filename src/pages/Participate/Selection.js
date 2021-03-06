import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
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
import Spacing from '../../components/Spacing';
import { NameLengthConstraint } from '../../constants';
import {
  showEventDateDetail,
  checkEventDate,
  checkNameInput,
} from '../../redux/actions/participate';
import {
  isCheckedDate,
} from '../../utils';

const mapStateToProps = state => ({
  dates: state.participate.get('eventDateList'),
  userUuid: state.participate.get('participantUserUuid'),
  enable: state.participate.get('name') !== ''
    && state.participate.get('name').length < NameLengthConstraint
    && !state.participate.get('nameErr'),
});
class Selection extends React.Component {
  constructor(props) {
    super(props);
    this.onCheckboxClick = this.onCheckboxClick.bind(this);
    this.onDateBodyClick = this.onDateBodyClick.bind(this);
  }

  onCheckboxClick(eventDate, idx) {
    if (!this.props.enable) {
      this.props.dispatch(checkNameInput());
      return;
    }
    this.props.dispatch(checkEventDate(eventDate, idx));
  }

  onDateBodyClick(eventDate) {
    if (!this.props.enable) {
      this.props.dispatch(checkNameInput());
      return;
    }
    this.props.dispatch(showEventDateDetail(eventDate));
  }

  get dateList() {
    let key = 0;
    const cellBodyClassName = classnames({
      'yk-text-disable': !this.props.enable,
    });
    return this.props.dates.map((eventDate, idx) => {
      const badge = eventDate.get('eventParticipantList').isEmpty() ?
        null : (<Badge preset="body">{eventDate.get('eventParticipantList').size}</Badge>);

      const { checked } = isCheckedDate(this.props.userUuid, eventDate);
      return (
        <Cell key={key++}>
          <CellHeader onClick={() => { this.onCheckboxClick(eventDate, idx); }}>
            <Checkbox name={eventDate.get('uuid')} checked={checked} readOnly />
          </CellHeader>
          <CellBody
            className={cellBodyClassName}
            onClick={() => { this.onDateBodyClick(eventDate); }}
          >
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
        <Spacing />
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
  enable: PropTypes.bool.isRequired,
  userUuid: PropTypes.string,
  dispatch: PropTypes.func,
};

export default connect(mapStateToProps)(Selection);

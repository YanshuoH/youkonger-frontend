import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Map, List } from 'immutable';
import {
  CellsTitle,
  Form,
  Icon,
  FormCell,
  CellBody,
  CellFooter,
  Radio,
  Button,
  ButtonArea,
  ActionSheet,
} from 'react-weui';
import NavBar from '../../components/NavBar';
import Spacing from '../../components/Spacing';
import { retrieveDDayFromEventDates } from '../../utils';
import {
  exitEventDateDetail,
  fetchApiDDay,
  hideActionSheet,
  showActionSheet,
} from '../../redux/actions/admin';

/**
 * While react css transition,
 * the actual currentEventDate is deleted but this component is still mounted.
 * Use a holder to prevent crash.
 * @type {Map<string, V>|Map<K, V>|*}
 */
const eventDateHolder = Map({
  timeInUnix: 0,
  eventParticipantList: List([]),
});
const mapStateToProps = state => ({
  eventDate: state.admin.get('currentEventDate') || eventDateHolder,
  unavailableList: state.admin.get('unavailableParticipantList'),
  eventTitle: state.admin.get('title'),
  dDay: retrieveDDayFromEventDates(state.admin.get('eventDateList')),
  showActionSheet: state.admin.get('showActionSheet'),
});
class Detail extends React.Component {
  constructor(props) {
    super(props);

    this.onConfirmButtonClick = this.onConfirmButtonClick.bind(this);
    this.state = {
      menus: [
        {
          label: '修改聚会日期可能会影响到已经收到通知的成员',
          className: 'yk-actionsheet-desc',
        },
        {
          label: '修改聚会日期并分享',
          className: 'yk-actionsheet-warning',
          onClick: () => { this.props.dispatch(fetchApiDDay()); },
        }
      ],
      actions: [
        {
          label: '取消',
          onClick: () => { this.props.dispatch(hideActionSheet()); },
        },
      ],
    };
  }

  onConfirmButtonClick() {
    if (this.props.dDay && this.props.dDay.get('uuid') !== this.props.eventDate.get('uuid')) {
      this.props.dispatch(showActionSheet());
      return;
    }

    this.props.dispatch(fetchApiDDay());
  }

  get nav() {
    return (
      <NavBar>
        <span
          className="arrow arrow-left"
          onClick={() => { this.props.dispatch(exitEventDateDetail()); }}
        />
        <span className="nav-title">{this.props.eventTitle}</span>
      </NavBar>
    );
  }

  get caption() {
    const formattedDate = moment
      .unix(this.props.eventDate.get('timeInUnix'))
      .utcOffset(8)
      .format('YYYY年MM月DD日');
    return (
      <div className="yk-admin-caption">
        <span>{formattedDate}</span>
      </div>
    );
  }

  get availableListHolder() {
    return (
      <div>
        <CellsTitle>暂时没有参加的人</CellsTitle>
      </div>
    );
  }

  get availableList() {
    const elems = this.props.eventDate.get('eventParticipantList').map((participant, idx) => (
      <FormCell radio key={idx}>
        <CellBody>{participant.get('name')}</CellBody>
        <CellFooter>
          <Radio defaultChecked disabled />
        </CellFooter>
      </FormCell>
    ));
    return (
      <div>
        <CellsTitle>有空的人</CellsTitle>
        <Form radio>
          {elems}
        </Form>
      </div>
    );
  }

  get unavailableList() {
    const elems = this.props.unavailableList.map((participant, idx) => (
      <FormCell key={idx}>
        <CellBody>{participant.get('name')}</CellBody>
        <CellFooter>
          <Icon value="circle" />
        </CellFooter>
      </FormCell>
    ));
    return (
      <div>
        <CellsTitle>没空的人</CellsTitle>
        <Form className="yk-text-disable">
          {elems}
        </Form>
      </div>
    );
  }

  get confirmButton() {
    return (
      <ButtonArea>
        <Button onClick={this.onConfirmButtonClick}>将这一天定为聚会日</Button>
      </ButtonArea>
    );
  }

  get actionSheet() {
    return (
      <ActionSheet
        menus={this.state.menus}
        actions={this.state.actions}
        show={this.props.showActionSheet}
        onRequestClose={() => { this.props.dispatch(hideActionSheet()); }}
      />
    );
  }

  render() {
    return (
      <div className="yk-container-with-nav">
        {this.nav}
        {this.caption}
        <Spacing />
        {this.availableList}
        <Spacing />
        {this.props.unavailableList.isEmpty() ? null : this.unavailableList}
        <Spacing />
        {this.confirmButton}
        {this.actionSheet}
      </div>
    );
  }
}

Detail.propTypes = {
  eventDate: PropTypes.object,
  eventTitle: PropTypes.string,
  unavailableList: PropTypes.object,
  dDay: PropTypes.object,
  showActionSheet: PropTypes.bool,
  dispatch: PropTypes.func,
};

export default connect(mapStateToProps)(Detail);

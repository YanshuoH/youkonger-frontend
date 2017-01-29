import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  Form,
  FormCell,
  CellsTitle,
  CellBody,
  CellFooter,
  Switch,
  Radio,
} from 'react-weui';
import NavBar from '../../components/NavBar';
import Spacing from '../../components/Spacing';
import './style.less';
import {
  exitEventDateDetail,
  checkEventDate,
} from '../../redux/actions/participate';

const mapStateToProps = state => ({
  eventDate: state.participate.get('currentEventDate'),
  eventTitle: state.participate.get('title'),
  name: state.participate.get('name'),
});

/**
 * The selected participate date, show details of that day
 */
class ParticipateDate extends React.Component {
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
      <div className="yk-participate-caption">
        <span>{formattedDate}</span>
      </div>
    );
  }

  get choice() {
    return (
      <div>
        <CellsTitle>你是否有空</CellsTitle>
        <Form>
          <FormCell switch>
            <CellBody>{this.props.name}</CellBody>
            <CellFooter>
              <Switch
                checked={this.props.eventDate.get('checked') || false}
                onChange={() => {
                  this.props.dispatch(checkEventDate(this.props.eventDate));
                }}
              />
            </CellFooter>
          </FormCell>
        </Form>
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
    const participants = this.props.eventDate.get('eventParticipantList');
    const elems = participants.map((participant, idx) => (
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

  /**
   * @TODO
   * @returns {XML}
   */
  get unavailableList() {
    return (<div />);
  }

  render() {
    return (
      <div className="yk-container-with-nav">
        {this.nav}
        {this.caption}
        <Spacing />
        {this.choice}
        <Spacing />
        {this.props.eventDate.get('eventParticipantList').size === 0 ? this.availableListHolder : this.availableList}
        <Spacing />
        {this.unavailableList}
      </div>
    );
  }
}

ParticipateDate.propTypes = {
  eventDate: PropTypes.object,
  name: PropTypes.string,
  eventTitle: PropTypes.string,
  dispatch: PropTypes.func,
};

export default connect(mapStateToProps)(ParticipateDate);

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  CellsTitle,
} from 'react-weui';
import Calendar from '../../components/Calendar';
import './style.less';
import {
  selectDate,
} from '../../redux/actions/creation';

const mapStateToProps = state => ({
  selected: state.event.get('creating').get('selected').toArray()
});
class Step2 extends React.Component {
  constructor() {
    super();
    this.state = {
      now: moment(),
    };
    this.calendarSelectFunc = this.calendarSelectFunc.bind(this);
  }
  calendarSelectFunc(day) {
    this.props.dispatch(selectDate(day));
  }

  render() {
    return (
      <div className="yk-step-container">
        <CellsTitle>选择日期 (多选)</CellsTitle>
        <Calendar
          select={this.calendarSelectFunc}
          definedMonth={this.state.now}
          selected={this.props.selected}
        />
      </div>
    );
  }
}

Step2.propTypes = {
  selected: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Step2);

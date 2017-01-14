import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  CellsTitle,
  Button,
} from 'react-weui';
import Calendar from '../../components/Calendar';
import './style.less';
import {
  selectDate,
  nextStep,
  previousStep,
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
        <div className="yk-btn">
          <Button
            onClick={() => { this.props.dispatch(nextStep()); }}
            disabled={this.props.selected.length === 0}
          >
            下一步
          </Button>
          <Button
            type="default"
            onClick={() => { this.props.dispatch(previousStep()); }}
          >
            后退
          </Button>
        </div>
      </div>
    );
  }
}

Step2.propTypes = {
  selected: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Step2);

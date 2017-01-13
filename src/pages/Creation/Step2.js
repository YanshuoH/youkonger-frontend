import React from 'react';
import moment from 'moment';
import Calendar from '../../components/Calendar';

class Step2 extends React.Component {
  constructor() {
    super();
    this.state = {
      now: moment(),
      selected: [],
    };
    this.calendarSelectFunc = this.calendarSelectFunc.bind(this);
  }
  calendarSelectFunc(day) {
    const selected = this.state.selected;
    selected.push(day);
    this.setState({
      selected
    });
  }

  render() {
    return (
      <div>
        <Calendar
          select={this.calendarSelectFunc}
          definedMonth={this.state.now}
          selected={this.state.selected}
        />
      </div>
    );
  }
}

export default Step2;

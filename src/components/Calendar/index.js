import React, { PropTypes } from 'react';
import moment from 'moment';
import './style.less';
import Week from './Week';
import DayNames from './DayNames';

class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      month: moment(),
    };
  }

  previous() {
    const month = this.state.month;
    month.add(-1, 'M');
    this.setState({ month });
  }

  next() {
    const month = this.state.month;
    month.add(1, 'M');
    this.setState({ month });
  }

  select(day) {
    this.props.selected = day.date;
    this.forceUpdate();
  }

  renderWeeks() {
    const weeks = [];
    const date = this.state.month.clone().startOf('month').add('w' - 1).day('Sunday');
    let done = false;
    let monthIndex = date.month();
    let count = 0;

    while (!done) {
      weeks.push(
        <Week
          key={date.toString()}
          date={date.clone()}
          month={this.state.month}
          select={this.select}
          selected={this.props.selected}
        />
      );
      date.add(1, 'w');
      done = count++ > 2 && monthIndex !== date.month();
      monthIndex = date.month();
    }

    return weeks;
  }

  renderMonthLabel() {
    return (<span>{this.state.month.format('MMMM, YYYY')}</span>);
  }

  render() {
    return (
      <div className="calendar">
        <div className="header">
          <i className="fa fa-angle-left" onClick={this.previous} />
          {this.renderMonthLabel()}
          <i className="fa fa-angle-right" onClick={this.next} />
        </div>
        <DayNames />
        {this.renderWeeks()}
      </div>
    );
  }
}

Calendar.propTypes = {
  selected: PropTypes.object,
};

export default Calendar;

import React, { PropTypes } from 'react';
import moment from 'moment';
import './style.less';
import Week from './Week';
import DayNames from './DayNames';

class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // use defined month, or use now
      month: this.props.definedMonth ? this.props.definedMonth : moment(),
    };
    this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);
    this.select = this.select.bind(this);
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
    // transfer selected day for parent component handling
    this.props.select(day);
    // force update
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
      <div className="yk-calendar">
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
  /**
   * Array of moment object, could be a length of zero
   */
  selected: PropTypes.arrayOf(PropTypes.object).isRequired,
  definedMonth: PropTypes.object,
  /**
   * @param day {Moment} moment object when selected
   */
  select: PropTypes.func.isRequired,
};

export default Calendar;

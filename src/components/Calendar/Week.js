import React, { PropTypes } from 'react';
import classnames from 'classnames';
import './style.less';

class Week extends React.PureComponent {
  render() {
    const days = [];
    const month = this.props.month;
    let date = this.props.date;

    for (let i = 0; i < 7; i++) {
      const day = {
        name: date.format('dd').substring(0, 1),
        number: date.date(),
        isCurrentMonth: date.month() === month.month(),
        isToday: date.isSame(new Date(), 'day'),
        date
      };

      let isSelected = false;
      for (let j = 0; j < this.props.selected.length; j++) {
        if (this.props.selected[j].isSame(day.date)) {
          isSelected = true;
          break;
        }
      }
      const klass = classnames(
        'day',
        { today: day.isToday },
        { 'different-month': !day.isCurrentMonth },
        { selected: isSelected }
      );

      days.push(
        <span
          key={day.date.toString()}
          className={klass}
          onClick={() => this.props.select(day.date)}
        >
          {day.number}
        </span>
      );
      date = date.clone();
      date.add(1, 'd');
    }

    return (
      <div className="week">
        {days}
      </div>
    );
  }
}

Week.propTypes = {
  month: PropTypes.object,
  date: PropTypes.object,
  selected: PropTypes.arrayOf(PropTypes.object),
  /**
   * function from Calendar
   */
  select: PropTypes.func.isRequired,
};

export default Week;

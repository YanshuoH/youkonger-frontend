import React, { PropTypes } from 'react';
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

      days.push(
        <span
          key={day.date.toString()}
          className={'day' + (day.isToday ? ' today' : '') + (day.isCurrentMonth ? '' : ' different-month') + (day.date.isSame(this.props.selected) ? ' selected' : '')}
          onClick={() => {}}
        >
          {day.number}
        </span>
      );
      date = date.clone();
      date.add(1, 'd');
    }

    return (
      <div className="week" key={days[0].toString()}>
        {days}
      </div>
    );
  }
}

Week.propTypes = {
  month: PropTypes.object,
  date: PropTypes.object,
  selected: PropTypes.object,
};

export default Week;

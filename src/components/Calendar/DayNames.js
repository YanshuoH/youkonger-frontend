import React from 'react';
import './style.less';

class DayNames extends React.PureComponent {
  render() {
    return (
      <div className="week names">
        <span className="day name">日</span>
        <span className="day name">一</span>
        <span className="day name">二</span>
        <span className="day name">三</span>
        <span className="day name">四</span>
        <span className="day name">五</span>
        <span className="day name">六</span>
      </div>
    );
  }
}

export default DayNames;

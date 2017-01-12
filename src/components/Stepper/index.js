import React, { PropTypes } from 'react';
import classnames from 'classnames';
import './style.less';

export default class Stepper extends React.PureComponent {
  render() {
    let key = 0;
    const items = [];

    for (let i = 1; i <= this.props.number; i++) {
      const circleClass = classnames('yk-stepper-circle', {
        checked: i < this.props.step
      });

      items.push(
        <div className="yk-stepper-item" key={key++}>
          <div className={circleClass}>{i}</div>
        </div>
      );
      if (i < this.props.number) {
        items.push(<div className="yk-stepper-line" />);
      }
    }

    return (
      <div className="yk-stepper-container">
        {items}
      </div>
    );
  }
}

Stepper.propTypes = {
  /**
   * Number of steps to render
   */
  number: PropTypes.number.isRequired,
  /**
   * Current step
   */
  step: PropTypes.number.isRequired
};

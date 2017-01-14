import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { Icon } from 'react-weui';
import './style.less';

export default class Stepper extends React.PureComponent {
  render() {
    let key = 0;
    const items = [];

    for (let i = 1; i <= this.props.number; i++) {
      const item = i < this.props.step ?
        (<Icon value="success" />) : (<div className="yk-stepper-circle">{i}</div>);

      items.push(
        <div className="yk-stepper-item" key={key++}>
          {item}
        </div>
      );
      if (i < this.props.number) {
        items.push(<div className="yk-stepper-line" key={key++} />);
      }
    }

    return (
      <div className={classnames('yk-stepper-container', this.props.className)}>
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
  step: PropTypes.number.isRequired,
  className: PropTypes.string,
};

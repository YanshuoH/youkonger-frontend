import React, { PropTypes } from 'react';
import { Icon } from 'react-weui';
import './style.less';

export default class NavBar extends React.PureComponent {
  render() {
    return (
      <div className="yk-navbar">
        {this.props.children}
      </div>
    );
  }
}

NavBar.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
};

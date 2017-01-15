import React, { PropTypes } from 'react';
import { Icon } from 'react-weui';
import './style.less';

export default class NavBar extends React.PureComponent {
  render() {
    return null;
    return (
      <div className="yk-navbar">
        <Icon value="loading" />
        {this.props.children}
      </div>
    );
  }
}

NavBar.propTypes = {
  children: PropTypes.element
};

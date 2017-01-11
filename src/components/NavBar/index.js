import React, { PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';
import './style.less';

export default class NavBar extends React.PureComponent {
  render() {
    return (
      <div className="yk-navbar">
        <FontAwesome name="rocket" size="2x" spin />
        {this.props.children}
      </div>
    );
  }
}

NavBar.propTypes = {
  children: PropTypes.element
};

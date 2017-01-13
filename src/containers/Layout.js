import React, { PropTypes } from 'react';
import Navbar from '../components/NavBar';
import './style.less';

export default class Layout extends React.PureComponent {
  render() {
    return (
      <div>
        <Navbar>
          <div>Something</div>
        </Navbar>
        <div className="yk-container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.element
};

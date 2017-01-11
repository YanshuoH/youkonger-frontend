import React, { PropTypes } from 'react';
import Navbar from '../components/NavBar';

export default class Layout extends React.PureComponent {
  render() {
    return (
      <div>
        <Navbar>
          <div>Something</div>
        </Navbar>
        {this.props.children}
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.element
};

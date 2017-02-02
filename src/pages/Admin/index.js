import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import Entry from './Entry';

class Admin extends React.Component {
  get content() {
    return (<Entry />);
  }

  render() {
    return (
      <div>
        <ReactCSSTransitionGroup
          component="div"
          transitionName={this.props.moveForward ? 'pageSlide' : 'pageSlideReverse'}
          transitionEnterTimeout={300}
          transitionLeaveTimeout={200}
        >
          <div className="yk-container">
            {this.content}
          </div>
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

export default Admin;

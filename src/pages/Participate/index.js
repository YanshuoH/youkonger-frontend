import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import Entry from './Entry';
import Date from './Date';

const mapStateToProps = state => ({
  currentEventDate: state.participate.get('currentEventDate'),
  moveForward: state.participate.get('moveForward'),
});
class Participate extends React.Component {
  render() {
    // if currentEventDate is set, should render the  page
    // otherwise, Entry it is
    let content
    if (this.props.currentEventDate) {
      content = <Date />;
    } else {
      content = <Entry />;
    }
    return (
      <div>
        <ReactCSSTransitionGroup
          component="div"
          transitionName={this.props.moveForward ? 'pageSlide' : 'pageSlideReverse'}
          transitionEnterTimeout={300}
          transitionLeaveTimeout={200}
        >
          {content}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

Participate.propTypes = {
  currentEventDate: PropTypes.object,
  moveForward: PropTypes.bool,
}

export default connect()(Participate);

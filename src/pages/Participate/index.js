import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import Entry from './Entry';
import Date from './Date';
import Success from './Success';

const mapStateToProps = state => ({
  currentEventDate: state.participate.get('currentEventDate'),
  submitted: state.participate.get('submitted'),
  moveForward: state.participate.get('moveForward'),
});
class Participate extends React.Component {
  render() {
    // if currentEventDate is set, should render the date detail page
    // if submitted is set, should render the success page
    // otherwise, entry it is
    let content;
    if (this.props.currentEventDate && !this.props.submitted) {
      content = <Date />;
    } else if (!this.props.currentEventDate && this.props.submitted) {
      content = <Success />;
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
  submitted: PropTypes.bool,
};

export default connect(mapStateToProps)(Participate);

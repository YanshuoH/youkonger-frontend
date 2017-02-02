import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import Entry from './Entry';
import Detail from './Detail';
import Success from './Success';

const mapStateToProps = state => ({
  moveForward: state.admin.get('moveForward'),
  currentEventDate: state.admin.get('currentEventDate'),
  submitted: state.admin.get('submitted'),
});
class Admin extends React.Component {
  get content() {
    let key = 0;
    let elem = <Detail />;
    if (this.props.currentEventDate === undefined && !this.props.submitted) {
      key++;
      elem = <Entry />;
    } else if (this.props.submitted) {
      key++;
      elem = <Success />;
    }

    return { key, elem };
  }

  render() {
    const { key, elem } = this.content;
    return (
      <div>
        <ReactCSSTransitionGroup
          component="div"
          transitionName={this.props.moveForward ? 'pageSlide' : 'pageSlideReverse'}
          transitionEnterTimeout={300}
          transitionLeaveTimeout={200}
        >
          <div className="yk-container" key={key}>
            {elem}
          </div>
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

Admin.propTypes = {
  moveForward: PropTypes.bool,
  currentEventDate: PropTypes.object,
  submitted: PropTypes.bool,
};

export default connect(mapStateToProps)(Admin);

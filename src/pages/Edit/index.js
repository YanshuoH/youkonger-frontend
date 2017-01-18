import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux';
import classnames from 'classnames';
import Stepper from '../../components/Stepper';
import { Step } from '../../constants';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import './style.less';

const mapStateToProps = state => ({
  step: state.create.get('step'),
  moveForward: state.create.get('moveForward'),
});
class Creation extends React.Component {

  get content() {
    if (this.props.step === Step.Step1) {
      return (<Step1 />);
    } else if (this.props.step === Step.Step2) {
      return (<Step2 />);
    } else if (this.props.step === Step.Step3) {
      return (<Step3 />);
    }

    return null;
  }

  render() {
    const stepper = this.props.step < Step.Step3 ?
      (<Stepper number={2} step={this.props.step} />) : null;
    return (
      <ReactCSSTransitionGroup
        component="div"
        transitionName={this.props.moveForward ? 'pageSlide' : 'pageSlideReverse'}
        transitionEnterTimeout={300}
        transitionLeaveTimeout={200}
      >
        <div className={classnames('yk-container', 'yk-creation')} key={this.props.step}>
          {stepper}
          {this.content}
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}

Creation.propTypes = {
  step: PropTypes.oneOf(Step.Order),
  moveForward: PropTypes.bool,
};

export default connect(mapStateToProps)(Creation);

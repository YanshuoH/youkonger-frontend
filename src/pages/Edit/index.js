import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-weui';
import Stepper from '../../components/Stepper';
import { Step } from '../../constants';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import './style.less';

const mapStateToProps = state => ({
  step: state.event.get('creating').get('step'),
});
class Creation extends React.Component {
  get content() {
    if (this.props.step === Step.Step1) {
      return (<Step1 />);
    }
    if (this.props.step === Step.Step2) {
      return (<Step2 />);
    }
    if (this.props.step === Step.Step3) {
      return (<Step3 />);
    }

    return null;
  }

  render() {
    return (
      <div className="yk-creation">
        <Stepper number={3} step={this.props.step} className="" />
        {this.content}
      </div>
    );
  }
}

Creation.propTypes = {
  step: PropTypes.oneOf(Step.Order),
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Creation);

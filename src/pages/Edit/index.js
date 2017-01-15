import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
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
    const stepper = this.props.step < Step.Step3 ?
      (<Stepper number={2} step={this.props.step} />) : null;
    return (
      <div className="yk-creation">
        {stepper}
        {this.content}
      </div>
    );
  }
}

Creation.propTypes = {
  step: PropTypes.oneOf(Step.Order),
};

export default connect(mapStateToProps)(Creation);

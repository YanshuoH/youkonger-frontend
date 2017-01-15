import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  Msg,
  Button,
  CellsTitle,
} from 'react-weui';
import './style.less';
import Clipboard from '../../components/Clipboard';
import {
  previousStep,
} from '../../redux/actions/edit';

const mapStateToProps = state => ({
  createdEvent: state.event.get('creating'),
});
class Step3 extends React.Component {

  get successContent() {
    return (
      <Msg
        type="success"
        title="完成"
        description="点击右上角的分享网页并发送给好友"
      />
    );
  }

  get controlButtons() {
    return (
      <div className="yk-btn">
        <Clipboard
          type="button"
          btnId="shareBtn"
          value={window.location.href}
        >
          点击复制链接, 然后发送给好友
        </Clipboard>
        <Button
          type="default"
          onClick={() => { this.props.dispatch(previousStep()); }}
        >返回修改</Button>
      </div>
    );
  }

  get adminHash() {
    return (
      <div className="hash-container">
        <CellsTitle className="wording">请妥善保管以下链接, 以备将来统计结果时使用</CellsTitle>
        <Clipboard
          type="input"
          btnId="adminUrlBtn"
          value={`${window.location.href}/admin/${this.props.createdEvent.get('hash')}`}
        />
      </div>
    );
  }

  render() {
    return (
      <div className="yk-step-container">
        {this.successContent}
        {this.controlButtons}
        {this.adminHash}
      </div>
    );
  }
}

Step3.propTypes = {
  createdEvent: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Step3);

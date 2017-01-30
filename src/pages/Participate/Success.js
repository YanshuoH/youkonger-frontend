import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  Msg,
  Button,
} from 'react-weui';
import Clipboard from '../../components/Clipboard';
import {
  goBackAndEdit,
} from '../../redux/actions/participate';

class Success extends React.Component {
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
          onClick={() => { this.props.dispatch(goBackAndEdit()); }}
        >返回修改</Button>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.successContent}
        {this.controlButtons}
      </div>
    );
  }
}

Success.propTypes = {
  dispatch: PropTypes.func,
};

export default connect()(Success);

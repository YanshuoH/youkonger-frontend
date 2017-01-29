import React from 'react';
import {
  Msg,
  Button,
} from 'react-weui';
import Clipboard from '../../components/Clipboard';

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
          onClick={() => { }}
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

export default Success;

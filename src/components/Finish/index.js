import React, { PropTypes } from 'react';
import {
  Msg,
  Panel,
  PanelBody,
  MediaBox,
  MediaBoxTitle,
  MediaBoxDescription,
} from 'react-weui';
import Clipboard from '../Clipboard';
import {
  formatUnixSecondToDate,
} from '../../utils';

class Success extends React.Component {
  get successContent() {
    const title = this.props.title ? this.props.title : '完成';
    return (
      <Msg
        type="success"
        title={title}
        description="点击右上角的分享网页并发送给好友"
      />
    );
  }

  get panel() {
    const desc = this.props.event.get('description') !== '' ?
      <span>{this.props.event.get('description')}</span> : null;
    const loc = this.props.event.get('location') !== '' ?
      <span>地址: {this.props.event.get('location')}</span> : null;
    const formattedDate = formatUnixSecondToDate(this.props.dDay.get('timeInUnix'));

    const participants = [];
    for (let i = 0; i < this.props.dDay.get('eventParticipantList').size; i++) {
      participants.push(this.props.dDay.get('eventParticipantList').get(i).get('name'));
    }
    const pat = <span>参与者: {participants.join(', ')}</span>;
    return (
      <Panel>
        <PanelBody>
          <MediaBox>
            <MediaBoxTitle>
              {this.props.event.get('title')}
            </MediaBoxTitle>
            <MediaBoxDescription className="yk-admin-desc">
              <span className="yk-bold">日期: {formattedDate}</span>
              {desc}
              {loc}
              {pat}
            </MediaBoxDescription>
          </MediaBox>
        </PanelBody>
      </Panel>
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
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.successContent}
        {this.panel}
        {this.controlButtons}
      </div>
    );
  }
}

Success.propTypes = {
  event: PropTypes.object.isRequired,
  dDay: PropTypes.object.isRequired,
  title: PropTypes.string,
};

export default Success;

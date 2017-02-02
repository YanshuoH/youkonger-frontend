import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  Msg,
  Panel,
  PanelBody,
  MediaBox,
  MediaBoxTitle,
  MediaBoxDescription,
} from 'react-weui';
import Clipboard from '../../components/Clipboard';
import {
  formatUnixSecondToDate,
} from '../../utils';

const mapStateToProps = state => ({
  event: state.admin,
  currentEventDate: state.admin.get('currentEventDate'),
});
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

  get panel() {
    const desc = this.props.event.get('description') !== '' ?
      <span>{this.props.event.get('description')}</span> : null;
    const loc = this.props.event.get('location') !== '' ?
      <span>地址: {this.props.event.get('location')}</span> : null;
    const formattedDate = formatUnixSecondToDate(this.props.currentEventDate.get('timeInUnix'));
    return (
      <Panel>
        <PanelBody>
          <MediaBox>
            <MediaBoxTitle>
              {this.props.event.get('title')}
            </MediaBoxTitle>
            <MediaBoxDescription className="yk-admin-desc">
              {desc}
              {loc}
              <span>日期: {formattedDate}</span>
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
  event: PropTypes.object,
  currentEventDate: PropTypes.object,
};

export default connect(mapStateToProps)(Success);

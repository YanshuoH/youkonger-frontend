import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  Msg,
} from 'react-weui';
import './style.less';
import {
  previousStep,
} from '../../redux/actions/edit';

const mapStateToProps = state => ({
  event: state.event,
});
class Step3 extends React.Component {
  render() {
    return (
      <div className="yk-step-container">
        <Msg
          type="success"
          title="完成"
          description="点击右上角的分享网页并发送给好友"
          buttons={[
            {
              type: 'primary',
              label: '点击复制链接, 然后发送给好友',
              onClick: () => { this.props.dispatch(previousStep()); }
            },
            {
              type: 'default',
              label: '返回修改',
              onClick: () => { this.props.dispatch(previousStep()); }
            }
          ]}
        />
      </div>
    );
  }
}

Step3.propTypes = {
  event: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Step3);

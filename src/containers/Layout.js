import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Toast } from 'react-weui';
import './style.less';

const mapStateToProps = state => ({
  toastMsg: state.toast.message,
  toastShow: state.toast.show,
});
class Layout extends React.PureComponent {
  render() {
    return (
      <div>
        <div className="yk-container">
          {this.props.children}
        </div>
        <Toast
          show={this.props.toastShow}
          className="yk-toast"
        >
          {this.props.toastMsg}
        </Toast>
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.element,
  toastMsg: PropTypes.string,
  toastShow: PropTypes.bool,
};

export default connect(mapStateToProps)(Layout);

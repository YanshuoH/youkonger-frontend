import React, { PropTypes, Children } from 'react';
import { connect } from 'react-redux';
import {
  Toast,
} from 'react-weui';
import TabBar from '../components/TabBar';
import './style.less';

const showTabBarComponents = ['Participate', 'Admin', 'Finish'];

const mapStateToProps = state => ({
  toastMsg: state.toast.message,
  toastShow: state.toast.show,
});
class Layout extends React.PureComponent {
  render() {
    let tabBar = null;

    const childrenArr = Children.toArray(this.props.children);
    for (let i = 0; i < childrenArr.length; i++) {
      const child = childrenArr[i];
      if (child.type
        && child.type.WrappedComponent
        && showTabBarComponents.indexOf(child.type.WrappedComponent.name) > -1
      ) {
        tabBar = <TabBar />;
        break;
      }
    }
    return (
      <div>
        <div className="yk-container">
          {this.props.children}
        </div>
        {tabBar}
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

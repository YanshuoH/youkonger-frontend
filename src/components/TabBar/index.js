import React from 'react';
import './style.less';

class TabBar extends React.Component {
  render() {
    return (
      <div className="weui-tabbar yk-tabbar">
        <div className="yk-tabbar-label">
          + 新建聚会计划
        </div>
      </div>
    );
  }
}

TabBar.propTypes = {

};

export default TabBar;

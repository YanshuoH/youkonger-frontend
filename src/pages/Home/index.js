import React from 'react';
import { Button } from 'react-weui';
import { browserHistory } from 'react-router';
import './style.less';

class Home extends React.PureComponent {
  render() {
    return (
      <div className="yk-home-container">
        <div className="yk-title">有空儿</div>
        <div className="yk-subtitle">帮你更好地组织聚会</div>
        <div className="yk-btn">
          <Button onClick={() => { browserHistory.push('/create'); }}>
            新建聚会计划
          </Button>
        </div>
      </div>
    );
  }
}

export default Home;

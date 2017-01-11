import React from 'react';
import { Button } from 'react-weui';
import './style.less';

export default () => (
  <div className="yk-home-container">
    <div className="yk-title">有空儿</div>
    <div className="yk-subtitle">帮你更好地组织聚会</div>
    <div className="yk-btn">
      <Button>
        新建聚会计划
      </Button>
    </div>
  </div>
);

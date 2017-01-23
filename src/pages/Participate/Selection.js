import React, { PropTypds } from 'react';
import { connect } from 'react-redux';
import {
  CellsTitle,
} from 'react-weui';

class Selection extends React.Component {
  render() {
    return (
      <div>
        <CellsTitle>选择有空的时间</CellsTitle>
      </div>
    );
  }
}

export default connect()(Selection);

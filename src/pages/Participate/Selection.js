import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  CellsTitle,
  Form,
  Cell,
  CellHeader,
  Checkbox,
  CellBody,
  CellFooter,
} from 'react-weui';

const mapStateToProps = state => ({
  dates: state.participate.get('eventDateList'),
})
class Selection extends React.Component {
  constructor(props) {
    super(props)
    this.onCheckboxClick = this.onCheckboxClick.bind(this)
    this.onDateBodyClick = this.onDateBodyClick.bind(this)
  }

  onCheckboxClick(eventDate) {
    console.log('checkbox')
  }

  onDateBodyClick(eventDate) {
    console.log('body')
  }

  get dateList() {
    let key = 0;
    return this.props.dates.map(eventDate => (
      <Cell key={key++}>
        <CellHeader onClick={() => { this.onCheckboxClick(eventDate); }}>
          <Checkbox name="checkbox1" value="1" />
        </CellHeader>
        <CellBody onClick={() => { this.onDateBodyClick(eventDate); }}>
          {moment.unix(eventDate.get('timeInUnix')).utcOffset(8).format('YYYY年MM月DD日')}
        </CellBody>
        <CellFooter
          onClick={() => {this.onDateBodyClick(eventDate); }}
          className="yk-cell-access-footer" />
      </Cell>
    ));
  }
  render() {
    return (
      <div>
        <CellsTitle>选择有空的时间</CellsTitle>
        <Form checkbox>
          {this.dateList}
        </Form>
      </div>
    );
  }
}

Selection.propTypes = {
  dates: PropTypes.object,
}

export default connect(mapStateToProps)(Selection);

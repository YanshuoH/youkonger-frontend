import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  Form,
  FormCell,
  CellHeader,
  Label,
  CellBody,
  Input,
  CellFooter,
  Icon,
  Button,
  ButtonArea,
} from 'react-weui';
import Spacing from '../../components/Spacing';
import Selection from './Selection';
import '../../styles/app.less';
import {
  onChangeNameInput,
  onBlurNameInput,
  fetchEventParticipantUpsertApi,
} from '../../redux/actions/participate';

const mapStateToProps = state => ({
  fetching: state.participate.get('fetching'),
  title: state.participate.get('title'),
  description: state.participate.get('description'),
  location: state.participate.get('location'),
  dateList: state.participate.get('eventDateList'),
  nameErr: state.participate.get('nameErr'),
  name: state.participate.get('name'),
  currentEventDate: state.participate.get('currentEventDate'),
});
class Participate extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeNameInput = this.onChangeNameInput.bind(this);
    this.onBlurNameInput = this.onBlurNameInput.bind(this);
    this.onSubmitButtonClick = this.onSubmitButtonClick.bind(this);
  }

  onChangeNameInput(e) {
    this.props.dispatch(onChangeNameInput(e.currentTarget.value));
  }

  onBlurNameInput(e) {
    this.props.dispatch(onBlurNameInput(e.currentTarget.value));
  }

  onSubmitButtonClick(e) {
    if (this.props.fetching) {
      return;
    }
    this.props.dispatch(fetchEventParticipantUpsertApi());
  }

  get optionalFields() {
    let key = 0;
    return [
      (<div className="yk-page-desc" key={key++}>{this.props.description}</div>),
      (<div className="yk-page-desc" key={key++}>{this.props.location}</div>)
    ];
  }

  get nameInput() {
    return (
      <Form>
        <FormCell warn={this.props.nameErr}>
          <CellHeader>
            <Label>你的名字</Label>
          </CellHeader>
          <CellBody>
            <Input
              type="text"
              placeholder={this.props.nameErr ? '名字为必填项' : 'John/Jane Doe'}
              onChange={this.onChangeNameInput}
              onBlur={this.onBlurNameInput}
              value={this.props.name}
            />
          </CellBody>
          {this.props.nameErr ?
            (<CellFooter><Icon value="warn" /></CellFooter>) : null
          }
        </FormCell>
      </Form>
    );
  }

  render() {
    // selected date size
    let selectedDateCount = 0;
    for (let i = 0; i < this.props.dateList.size; i++) {
      if (this.props.dateList.get(i).get('checked')) {
        selectedDateCount++;
      }
    }
    const submitBtnContent = this.props.fetching ?
      (<span><Icon value="loading" />发送中</span>) : ('有空');
    return (
      <div>
        <div className="yk-title-container">
          <div className="yk-page-title">{this.props.title}</div>
          {this.optionalFields}
          <div className="yk-page-desc">已参加人数: @TODO</div>
        </div>
        {this.nameInput}
        <Selection />
        <Spacing />
        <ButtonArea>
          <Button
            onClick={this.onSubmitButtonClick}
            disabled={this.props.fetching || selectedDateCount === 0}
          >
            {submitBtnContent}
          </Button>
          <Button type="default">抱歉无法参加</Button>
        </ButtonArea>
      </div>
    );
  }
}

Participate.propTypes = {
  dispatch: PropTypes.func,
  fetching: PropTypes.bool,
  title: PropTypes.string,
  dateList: PropTypes.object,
  description: PropTypes.string,
  location: PropTypes.string,
  nameErr: PropTypes.bool,
  name: PropTypes.string,
};

export default connect(mapStateToProps)(Participate);

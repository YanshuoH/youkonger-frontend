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
import { NameLengthConstraint } from '../../constants';
import {
  onChangeNameInput,
  onBlurNameInput,
  fetchEventParticipantUpsertApi,
  fetchParticipantUserUpsertApi,
} from '../../redux/actions/participate';
import {
  countCheckedDate,
  retrieveParticipantUserUUIDs,
} from '../../utils';

const mapStateToProps = state => ({
  fetching: state.participate.get('fetching'),
  title: state.participate.get('title'),
  description: state.participate.get('description'),
  location: state.participate.get('location'),
  dateList: state.participate.get('eventDateList'),
  unavailableList: state.participate.get('unavailableParticipantList'),
  nameErr: state.participate.get('nameErr'),
  name: state.participate.get('name'),
  userUuid: state.participate.get('participantUserUuid'),
  currentEventDate: state.participate.get('currentEventDate'),
});
class Participate extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeNameInput = this.onChangeNameInput.bind(this);
    this.onBlurNameInput = this.onBlurNameInput.bind(this);
    this.onSubmitButtonClick = this.onSubmitButtonClick.bind(this);
    this.onUnavailableButtonClick = this.onUnavailableButtonClick.bind(this);
  }

  onChangeNameInput(e) {
    this.props.dispatch(onChangeNameInput(e.currentTarget.value));
  }

  onBlurNameInput(e) {
    this.props.dispatch(onBlurNameInput(e.currentTarget.value));
  }

  onSubmitButtonClick() {
    if (this.props.fetching) {
      return;
    }
    this.props.dispatch(fetchEventParticipantUpsertApi());
  }

  onUnavailableButtonClick() {
    if (this.props.fetching) {
      return;
    }
    this.props.dispatch(fetchParticipantUserUpsertApi());
  }

  get optionalFields() {
    let key = 0;
    return [
      (<div className="yk-page-desc" key={key++}>{this.props.description}</div>),
      (<div className="yk-page-desc" key={key++}>{this.props.location}</div>)
    ];
  }

  get countFields() {
    let key = 0;
    return [
      (<div className="yk-page-desc" key={key++}>
        {`已参加人数: ${retrieveParticipantUserUUIDs(this.props.dateList).length}`}
      </div>),
      (<div className="yk-page-desc" key={key++}>
        {`无法参加人数: ${this.props.unavailableList.size}`}
      </div>),
    ];
  }

  get nameTip() {
    if (this.props.name.length > NameLengthConstraint) {
      return (
        <div className="weui-agree">
          <span className="weui-agree__text">
            *名字过长, 请保持在{NameLengthConstraint}字之内
          </span>
        </div>
      );
    }
    return null;
  }

  get nameInput() {
    const nameTip = this.nameTip;
    return (
      <Form>
        <FormCell warn={this.props.nameErr || !!nameTip}>
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
          {this.props.nameErr || !!nameTip ?
            (<CellFooter><Icon value="warn" /></CellFooter>) : null
          }
        </FormCell>
      </Form>
    );
  }

  render() {
    // selected date size
    const checkedDateCount = countCheckedDate(this.props.userUuid, this.props.dateList);
    const submitBtnContent = this.props.fetching ?
      (<span><Icon value="loading" />发送中</span>) : ('有空');
    const unavailableBtnContent = this.props.fetching ?
      (<span><Icon value="loading" />发送中</span>) : ('抱歉无法参加');

    return (
      <div>
        <div className="yk-title-container">
          <div className="yk-page-title">{this.props.title}</div>
          {this.optionalFields}
          {this.countFields}
        </div>
        {this.nameInput}
        {this.nameTip}
        <Selection />
        <Spacing />
        <ButtonArea>
          <Button
            onClick={this.onSubmitButtonClick}
            disabled={this.props.fetching || checkedDateCount === 0}
          >
            {submitBtnContent}
          </Button>
          <Button
            type="default"
            onClick={this.onUnavailableButtonClick}
            disabled={this.props.fetching}
          >
            {unavailableBtnContent}
          </Button>
        </ButtonArea>
      </div>
    );
  }
}

Participate.propTypes = {
  dispatch: PropTypes.func,
  fetching: PropTypes.bool,
  title: PropTypes.string,
  userUuid: PropTypes.string,
  dateList: PropTypes.object,
  unavailableList: PropTypes.object,
  description: PropTypes.string,
  location: PropTypes.string,
  nameErr: PropTypes.bool,
  name: PropTypes.string,
};

export default connect(mapStateToProps)(Participate);

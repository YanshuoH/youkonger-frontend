import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  CellsTitle,
  Button,
  Form,
  FormCell,
  CellHeader,
  CellBody,
  CellFooter,
  Label,
  Input,
  Icon,
} from 'react-weui';
import './style.less';
import {
  TitleLengthConstraint,
  DescriptionLengthConstraint,
  LocationLengthConstraint,
} from '../../constants';
import {
  nextStep,
  changeTitle,
  changeDescription,
  changeLocation,
  checkTitle,
} from '../../redux/actions/edit';

const mapStateToProps = state => ({
  title: state.create.get('title'),
  description: state.create.get('description'),
  location: state.create.get('location'),
  titleErr: state.create.get('titleErr'),
  virgin: state.create.get('virgin'),
});
class Step1 extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeTitleInput = this.onChangeTitleInput.bind(this);
    this.onChangeDescriptionInput = this.onChangeDescriptionInput.bind(this);
    this.onChangeLocationInput = this.onChangeLocationInput.bind(this);
    this.onBlurCheckTitle = this.onBlurCheckTitle.bind(this);
  }
  onChangeTitleInput(e) {
    this.props.dispatch(changeTitle(e.currentTarget.value));
  }

  onChangeDescriptionInput(e) {
    this.props.dispatch(changeDescription(e.currentTarget.value));
  }

  onChangeLocationInput(e) {
    this.props.dispatch(changeLocation(e.currentTarget.value));
  }

  onBlurCheckTitle(e) {
    this.props.dispatch(checkTitle(e.currentTarget.value));
  }

  get tips() {
    const res = {};
    if (this.props.title.length > TitleLengthConstraint) {
      res.titleTip = (
        <div className="weui-agree">
          <span className="weui-agree__text">
            *标题过长, 请保持在{TitleLengthConstraint}字之内
          </span>
        </div>
      );
    }
    if (this.props.description.length > DescriptionLengthConstraint) {
      res.descriptionTip = (
        <div className="weui-agree">
          <span className="weui-agree__text">
            *附加信息过长, 请保持在{DescriptionLengthConstraint}字之内
          </span>
        </div>
      );
    }
    if (this.props.location.length > LocationLengthConstraint) {
      res.locationTip = (
        <div className="weui-agree">
          <span className="weui-agree__text">
            *地址过长, 请保持在{LocationLengthConstraint}字之内
          </span>
        </div>
      );
    }
    return res;
  }

  render() {
    const { titleTip, descriptionTip, locationTip } = this.tips;
    return (
      <div className="yk-step-container">
        <CellsTitle>填写聚会基本信息</CellsTitle>
        <Form>
          <FormCell warn={this.props.titleErr || !!titleTip}>
            <CellHeader>
              <Label>标题</Label>
            </CellHeader>
            <CellBody>
              <Input
                type="text"
                placeholder={this.props.titleErr ? '标题为必填项' : '周末出来嗨'}
                onChange={this.onChangeTitleInput}
                onBlur={this.onBlurCheckTitle}
                value={this.props.title}
              />
            </CellBody>
            {this.props.titleErr || titleTip ?
              (<CellFooter><Icon value="warn" /></CellFooter>) : null
            }
          </FormCell>
          <FormCell warn={!!descriptionTip}>
            <CellHeader>
              <Label>附加信息</Label>
            </CellHeader>
            <CellBody>
              <Input
                type="text"
                placeholder="中午12点"
                onChange={this.onChangeDescriptionInput}
                value={this.props.description}
              />
            </CellBody>
            {descriptionTip ?
              (<CellFooter><Icon value="warn" /></CellFooter>) : null
            }
          </FormCell>
          <FormCell warn={!!locationTip}>
            <CellHeader>
              <Label>地址</Label>
            </CellHeader>
            <CellBody>
              <Input
                type="text"
                placeholder="国贸"
                onChange={this.onChangeLocationInput}
                value={this.props.location}
              />
            </CellBody>
            {locationTip ?
              (<CellFooter><Icon value="warn" /></CellFooter>) : null
            }
          </FormCell>
        </Form>
        {titleTip}
        {descriptionTip}
        {locationTip}
        <div className="yk-btn">
          <Button
            onClick={() => { this.props.dispatch(nextStep()); }}
            disabled={this.props.titleErr
            || this.props.virgin
            || !!titleTip
            || !!descriptionTip
            || !!locationTip}
          >
            下一步
          </Button>
        </div>
      </div>
    );
  }
}

Step1.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  location: PropTypes.string,
  titleErr: PropTypes.bool,
  virgin: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Step1);

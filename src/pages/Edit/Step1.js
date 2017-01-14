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
  nextStep,
  changeTitle,
  changeDescription,
  changeLocation,
  checkTitle,
} from '../../redux/actions/creation';

const mapStateToProps = state => ({
  title: state.event.get('creating').get('title'),
  description: state.event.get('creating').get('description'),
  location: state.event.get('creating').get('location'),
  titleErr: state.event.get('creating').get('titleErr'),
  virgin: state.event.get('creating').get('virgin')
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

  render() {
    return (
      <div className="yk-step-container">
        <CellsTitle>填写聚会基本信息</CellsTitle>
        <Form>
          <FormCell warn={this.props.titleErr}>
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
            {this.props.titleErr ?
              (<CellFooter><Icon value="warn" /></CellFooter>) : null
            }
          </FormCell>
          <FormCell>
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
          </FormCell>
          <FormCell>
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
          </FormCell>
        </Form>
        <div className="yk-btn">
          <Button
            onClick={() => { this.props.dispatch(nextStep()); }}
            disabled={this.props.titleErr || this.props.virgin}
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

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  CellsTitle,
  Form,
  FormCell,
  CellHeader,
  CellBody,
  Label,
  Input,
} from 'react-weui';
import {
  changeTitle,
  changeDescription,
  changeLocation,
} from '../../redux/actions/creation';

const mapStateToProps = state => ({
  title: state.event.get('creating').get('title'),
  description: state.event.get('creating').get('description'),
  location: state.event.get('creating').get('location')
});
class Step1 extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeTitleInput = this.onChangeTitleInput.bind(this);
    this.onChangeDescriptionInput = this.onChangeDescriptionInput.bind(this);
    this.onChangeLocationInput = this.onChangeLocationInput.bind(this);
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

  render() {
    return (
      <div className="yk-step-container">
        <CellsTitle>填写聚会基本信息</CellsTitle>
        <Form>
          <FormCell>
            <CellHeader>
              <Label>标题</Label>
            </CellHeader>
            <CellBody>
              <Input
                type="text"
                placeholder="周末出来嗨"
                onChange={this.onChangeTitleInput}
                value={this.props.title}
              />
            </CellBody>
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
      </div>
    );
  }
}

Step1.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  location: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Step1);

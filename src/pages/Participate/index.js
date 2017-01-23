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
} from 'react-weui';
import '../../styles/app.less';
import {
  onChangeNameInput,
  onBlurNameInput,
} from '../../redux/actions/participate';

const mapStateToProps = state => ({
  title: state.participate.get('title'),
  description: state.participate.get('description'),
  location: state.participate.get('location'),
  dateList: state.participate.get('eventDateList'),
  nameErr: state.participate.get('nameErr'),
  name: state.participate.get('name'),
})
class Participate extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeNameInput = this.onChangeNameInput.bind(this);
    this.onBlurNameInput = this.onBlurNameInput.bind(this);
  }

  onChangeNameInput(e) {
    this.props.dispatch(onChangeNameInput(e.currentTarget.value));
  }

  onBlurNameInput(e) {
    this.props.dispatch(onBlurNameInput(e.currentTarget.value));
  }

  get optionalFields() {
    let key = 0;
    return ['description', 'location'].map(name => (
      <div className="yk-page-desc" key={key++}>{this.props[name]}</div>
    ));
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
    return (
      <div>
        <div className="yk-title-container">
          <div className="yk-page-title">{this.props.title}</div>
          {this.optionalFields}
          <div className="yk-page-desc">{`已参加人数: ${this.props.dateList.size}`}</div>
        </div>
        {this.nameInput}
      </div>
    );
  }
}

Participate.propTypes = {
  dispatch: PropTypes.func,
  title: PropTypes.string,
  description: PropTypes.string,
  location: PropTypes.string,
  nameErr: PropTypes.bool,
  name: PropTypes.string,
  /**
   * {Immutable.List}
   */
  dateList: PropTypes.object,
}

export default connect(mapStateToProps)(Participate);

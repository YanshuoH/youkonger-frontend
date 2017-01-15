import React, { PropTypes } from 'react';
import Clipboard from 'clipboard';
import {
  Input,
  Button,
  Toptips,
  CellFooter,
  CellBody,
  FormCell,
  Form,
} from 'react-weui';

class ButtonClipboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSuccess: false,
      showWarn: false,
      warnTimer: null,
      successTimer: null,
    };
    this.showSuccess = this.showSuccess.bind(this);
    this.showWarn = this.showWarn.bind(this);
  }

  componentDidMount() {
    this.clipboard = new Clipboard(`#${this.props.btnId}`, {
      text: () => this.props.value
    });
    this.clipboard.on('success', (e) => {
      this.showSuccess();
      if (this.props.onSuccess) {
        this.props.onSuccess(e);
      }
    });
    this.clipboard.on('error', (e) => {
      this.showWarn();
      if (this.props.onError) {
        this.props.onError(e);
      }
    });
  }

  componentWillUnmount() {
    if (this.clipboard) {
      this.clipboard.destroy();
    }
    if (this.state.warnTimer) {
      clearTimeout(this.state.warnTimer);
    }
    if (this.state.successTimer) {
      clearTimeout(this.state.successTimer);
    }
  }

  showWarn() {
    this.setState({ showWarn: true });

    this.state.warnTimer = setTimeout(() => {
      this.setState({ showWarn: false });
    }, 2000);
  }

  showSuccess() {
    this.setState({ showSuccess: true });

    this.state.successTimer = setTimeout(() => {
      this.setState({ showSuccess: false });
    }, 2000);
  }

  get inputBoard() {
    return (
      <Form>
        <FormCell>
          <CellBody>
            <Input type="text" defaultValue={this.props.value} readOnly />
          </CellBody>
          <CellFooter>
            <Button
              type="vcode"
              id={this.props.btnId}
            >复制</Button>
          </CellFooter>
        </FormCell>
      </Form>
    );
  }

  get buttonBoard() {
    return (
      <Button
        id={this.props.btnId}
      >
        {this.props.children}
      </Button>
    );
  }

  render() {
    return (
      <div>
        {this.props.type === 'button' ? this.buttonBoard : this.inputBoard}
        <Toptips type="primary" show={this.state.showSuccess}>已成功复制到剪贴板</Toptips>
        <Toptips type="warn" show={this.state.showWarn}>复制过程中出现错误, 您可以直接分享网页给好友</Toptips>
      </div>
    );
  }
}

ButtonClipboard.propTypes = {
  type: PropTypes.oneOf(['button', 'input']).isRequired,
  value: PropTypes.string.isRequired,
  btnId: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
};

export default ButtonClipboard;

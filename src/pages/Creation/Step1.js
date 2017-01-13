import React from 'react';
import {
  CellsTitle,
  Form,
  FormCell,
  CellHeader,
  CellBody,
  Label,
  Input,
} from 'react-weui';

class Step1 extends React.Component {
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
              <Input type="text" placeholder="周末出来嗨" />
            </CellBody>
          </FormCell>
          <FormCell>
            <CellHeader>
              <Label>附加信息</Label>
            </CellHeader>
            <CellBody>
              <Input type="text" placeholder="中午12点" />
            </CellBody>
          </FormCell>
          <FormCell>
            <CellHeader>
              <Label>地址</Label>
            </CellHeader>
            <CellBody>
              <Input type="text" placeholder="国贸" />
            </CellBody>
          </FormCell>
        </Form>
      </div>
    );
  }
}

export default Step1;

import React from 'react';
import PropTypes from 'prop-types';
// Ant
import 'antd/dist/antd.css'
import { Form, Icon, Input, Button } from 'antd';

// 正则
import regPattern from '../../../utils/regPattern'

// Mu
import Paper from 'material-ui/Paper';
import MuButton from 'material-ui/Button';

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  constructor(props, context){
    super(props)
    console.log(context)
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem style={{maxWidth: 260, margin: 'auto'}}>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '请填入用户名' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="手机号或邮箱" />
          )}
        </FormItem>
        <FormItem style={{maxWidth: 260, margin: 'auto'}}>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请填入登录密码' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
          )}

        </FormItem>
        <FormItem style={{ textAlign: 'center' }}>
          <MuButton variant="raised" color="secondary" style={{marginTop: 10,width: 260}} type="submit">
            Let Me In
          </MuButton>
        </FormItem>
      </Form>
    );
  }
}

NormalLoginForm.contextTypes = {
  store: PropTypes.object
};

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);


export default WrappedNormalLoginForm
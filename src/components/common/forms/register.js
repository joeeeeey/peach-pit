import React from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import { Form, Icon, Input, Button, Tooltip, message } from 'antd';
import '../../../css/registerFrom.css'
import MuButton from 'material-ui/Button';
// 正则
import regPattern from '../../../utils/regPattern'
import { Redirect } from 'react-router-dom'

import UserService from '../../../services/userService'

const FormItem = Form.Item;
const userService = new UserService()

class RegistrationForm extends React.Component {
  constructor(props, context) {
    super(props)
    this.state = {
      confirmDirty: false,
      redirectIndex: false,
    };
  }

  handleSubmitRegister = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const result = userService.register(values)
          .then(response => {
            // 成功 set store 
            // 提示注册成功，跳转
            const { data } = response
            // {"code":0,"msg":"OK","data":{"login":"asq@fd.cca"}}
            if (data.code === 0) {
              const userProfile = data.data
              message.success(`注册成功😘~欢迎你 ${userProfile.nickname}`, 8)

              this.context.store.dispatch({
                type: 'update',
                payload: {nestedKey: "isLogin", value: true},
                target: 'user',
              });   

              this.context.store.dispatch({
                type: 'update',
                payload: {nestedKey: "profile", value: userProfile},
                target: 'user',
              });                 

              this.setState({
                redirectIndex: true
              })
            }else{
              message.error(`😥 ${data.msg}`, 1.2)
            }
          })
          .catch(function (error) {
            message.error(`😥 出现异常: ${error.msg}`, 2)
          });
      }
    });
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }
  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  render() {
    const { redirectIndex } = this.state;

    if (redirectIndex) {
      return <Redirect to='/user/sites' />;
    }

    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    return (
      <Form onSubmit={this.handleSubmitRegister}>
        <FormItem
          {...formItemLayout}
          style={{ maxWidth: 350, margin: 'auto', textAlign: 'center' }}
          label="账号"
        >
          {getFieldDecorator('login', {
            rules: [{
              required: true, message: '请填入邮箱或手机号',
            },
            { message: '请填入正确邮箱或手机号', pattern: regPattern.emailAndCnPhoneReg() }
            ],
          })(
            <Input placeholder="手机号或邮箱" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          style={{ maxWidth: 350, margin: 'auto' }}
          label="密码"
        >
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: '请填入密码!',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <Input type="password" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          style={{ maxWidth: 350, margin: 'auto' }}
          label="确认密码"
        >
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: '请确认密码!',
            }, {
              validator: this.compareToFirstPassword,
            }],
          })(
            <Input type="password" onBlur={this.handleConfirmBlur} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          style={{ maxWidth: 350, margin: 'auto' }}
          label={(
            <span>
              昵称&nbsp;
              <Tooltip title="希望我们怎么称呼您?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('nickname', {
            rules: [{ required: false, whitespace: true }],
          })(
            <Input />
          )}
        </FormItem>

        <FormItem style={{ textAlign: 'center' }}>
          <MuButton variant="raised" color="secondary" style={{ marginLeft: 50, marginTop: 10, width: 228 }} type="submit">
            注册
          </MuButton>
        </FormItem>
      </Form>
    );
  }
}


RegistrationForm.contextTypes = {
  store: PropTypes.object
};

const WrappedRegistrationForm = Form.create()(RegistrationForm);

export default WrappedRegistrationForm;
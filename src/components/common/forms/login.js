import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom'
// Ant
import 'antd/dist/antd.css'
import { Form, Icon, Input, Button } from 'antd';
import UserService from '../../../services/userService'
// 正则
import regPattern from '../../../utils/regPattern'

// Mu
import Paper from 'material-ui/Paper';
import MuButton from 'material-ui/Button';

const FormItem = Form.Item;
const userService = new UserService()
class NormalLoginForm extends React.Component {
  constructor(props, context){
    super(props)
    this.state = {redirectIndex: false}
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const result = userService.login(values)
          .then(response => {
            // 成功 set store 
            // 提示注册成功，跳转
            const { data } = response
            console.log(data)
            // {"code":0,"msg":"OK","data":{"login":"asq@fd.cca"}}
            if (data.code === 0) {
              this.context.store.dispatch({
                type: 'replace',
                payload: { isLogin: true, profile: data.data },
                target: 'user',
              });
              this.setState({
                redirectIndex: true
              })
            }
          })
          .catch(function (error) {
            // TODO 提示异常
            console.log(error);
          });        
        
      }
    });
  }

  render() {
    const { redirectIndex } = this.state;

    if (redirectIndex) {
      return <Redirect to='/' />;
    }    
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem style={{maxWidth: 260, margin: 'auto'}}>
          {getFieldDecorator('login', {
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
import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
// Ant
import "antd/dist/antd.css";
import { Form, Icon, Input, message } from "antd";
import UserService from "../../../services/userService";
import AdminService from "../../../services/adminService";

// Mu
import MuButton from "material-ui/Button";

const FormItem = Form.Item;
const userService = new UserService();
const adminService = new AdminService();
class NormalLoginForm extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = { redirectIndex: false, redirectAdminIndex: false };
  }

  adminLogin = values => {
    adminService
      .login(values)
      .then(response => {
        const { data } = response;
        if (data.code === 0) {
          const adminProfile = data.data;
          message.success(`登录成功😘~欢迎你啊 ${adminProfile.nickname}`, 6);

          this.context.store.dispatch({
            type: "replace",
            payload: { isLogin: true, adminProfile: adminProfile },
            target: "administrator"
          });

          this.setState({
            redirectAdminIndex: true
          });
        } else {
          message.error(`😥 ${data.msg}`, 1.2);
        }
      })
      .catch(function(error) {
        message.error(`😥 出现异常: ${error}`, 2);
      });
  };

  userLogin = values => {
    userService
      .login(values)
      .then(response => {
        const { data } = response;
        if (data.code === 0) {
          const userProfile = data.data;
          message.success(`登录成功😘~欢迎你 ${userProfile.nickname}`, 6);

          this.context.store.dispatch({
            type: "replace",
            payload: { isLogin: true, profile: userProfile },
            target: "user"
          });
          this.setState({
            redirectIndex: true
          });
        } else {
          message.error(`😥 ${data.msg}`, 1.2);
        }
      })
      .catch(function(error) {
        message.error(`😥 出现异常: ${error}`, 2);
      });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (this.props.role === "user") {
          this.userLogin(values);
        } else if (this.props.role === "admin") {
          this.adminLogin(values);
        }
      }
    });
  };

  render() {
    const { redirectIndex, redirectAdminIndex } = this.state;

    if (redirectIndex) {
      return <Redirect to="/user/sites" />;
    }

    if (redirectAdminIndex) {
      return <Redirect to="/admin/home" />;
    }

    const { getFieldDecorator } = this.props.form;
    return (
      <div style={{ paddingTop: 16, paddingBottom: 16 }}>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem style={{ maxWidth: 260, margin: "auto" }}>
            {getFieldDecorator("login", {
              rules: [{ required: true, message: "请填入用户名" }]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="手机号或邮箱"
              />
            )}
          </FormItem>
          <FormItem style={{ maxWidth: 260, margin: "auto" }}>
            {getFieldDecorator("password", {
              rules: [{ required: true, message: "请填入登录密码" }]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="密码"
              />
            )}
          </FormItem>
          <FormItem style={{ textAlign: "center" }}>
            <MuButton
              variant="raised"
              color="secondary"
              style={{ marginTop: 10, width: 260 }}
              type="submit">
              Let Me In
            </MuButton>
          </FormItem>
        </Form>
      </div>
    );
  }
}

NormalLoginForm.contextTypes = {
  store: PropTypes.object
};

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default WrappedNormalLoginForm;

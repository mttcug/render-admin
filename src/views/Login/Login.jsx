import React, { Component } from "react";
import {
  Layout,
  Input,
  Form,
  Button,
  Divider,
  message,
  notification
} from "antd";
import { withRouter } from "react-router-dom";
import { UserOutlined, UnlockOutlined } from "@ant-design/icons";
// import axios from '@/api'
// import { API } from '@/api/config'
import "@/style/view-style/login.scss";

class Login extends Component {
  state = {
    loading: false
  };

  enterLoading = () => {
    this.setState({
      loading: true
    });
  };

  handleSubmit = values => {
    let { username, password } = values;
    // axios
    //     .post(`${API}/login`, { username, password })
    //     .then(res => {
    //         if (res.data.code === 0) {
    //             localStorage.setItem('user', JSON.stringify(res.data.data.user))
    //             localStorage.setItem('token', res.data.data.token)
    //             this.props.history.push('/')
    //             message.success('登录成功!')
    //         } else {
    //             // 这里处理一些错误信息
    //         }
    //     })
    //     .catch(err => {})

    // 这里可以做权限校验 模拟接口返回用户权限标识
    switch (username) {
      case "admin":
        values.auth = 0;
        break;
      default:
        values.auth = 1;
    }

    localStorage.setItem("user", JSON.stringify(values));
    this.enterLoading();
    this.timer = setTimeout(() => {
      message.success("登录成功!");
      this.props.history.push("/");
    }, 2000);
  };

  componentDidMount() {
    notification.open({
      message: "欢迎使用后台管理平台",
      duration: null,
      description: "账号 admin(管理员) 其他(游客) 密码随意"
    });
  }

  componentWillUnmount() {
    notification.destroy();
    this.timer && clearTimeout(this.timer);
  }

  render() {
    return (
      <Layout className="login animated fadeIn">
        <div className="model">
          <div className="login-form">
            <h3>后台管理系统</h3>
            <Divider />
            <Form onFinish={this.handleSubmit} autoComplete="off">
              <Form.Item
                name="username"
                rules={[{ required: true, message: "请输入用户名!" }]}
              >
                <Input
                  prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                  placeholder="用户名"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: "请输入密码" }]}
              >
                <Input
                  prefix={
                    <UnlockOutlined style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="密码"
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  loading={this.state.loading}
                >
                  登录
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Layout>
    );
  }
}

export default withRouter(Login);

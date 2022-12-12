import React from "react";
import { Button, Form, Input } from "antd";
import "./index.scss";

const AppInfomation = props => {
  const { TextArea } = Input;

  // 保存创建的Application信息， 并跳转表单信息构建页面
  const save = values => {
    const { appName, appId } = values;
    const apps = JSON.parse(sessionStorage.getItem("app") || "[]");
    apps.push(values);
    sessionStorage.setItem("app", JSON.stringify(apps));
    props.history.push(`/createApp/appBuild?appId=${appId}`);
  };

  const failed = errorInfo => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="app-info-container">
      <p>创建您的Application</p>
      <Form
        name="basic"
        className="app-info-form"
        labelCol={{
          span: 5
        }}
        wrapperCol={{
          span: 16
        }}
        onFinish={save}
        onFinishFailed={failed}
        autoComplete="off"
      >
        <Form.Item
          label="应用名称"
          name="appName"
          rules={[
            {
              required: true,
              message: "请输入应用名称!"
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="应用id"
          name="appId"
          rules={[
            {
              required: true,
              message: "请输入应用id!"
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="创建人"
          name="creator"
          rules={[
            {
              required: true,
              message: "请输入创建人!"
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="应用描述"
          name="desc"
          rules={[
            {
              required: false,
              message: "请输入应用描述!"
            }
          ]}
        >
          <TextArea rows={4} placeholder="请输入详细描述" />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16
          }}
        >
          <Button type="primary" htmlType="submit">
            创建应用
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AppInfomation;

import React from "react";
import { Button, Form, Input, Select } from "antd";
import { applicationTypes } from "@/assets/utils/config.js";
import { useLocation, useNavigate } from "react-router-dom";
import { getUrlParams } from "@/assets/utils/index.js";
import "./index.scss";

const AppInfomation = props => {
  const { TextArea } = Input;
  const { search } = useLocation();
  const navigate = useNavigate();
  // 创建应用的应用类型
  const appType = getUrlParams("appType", search);

  // 保存创建的Application信息， 并跳转表单信息构建页面
  const save = values => {
    const { appName, appId } = values;
    const apps = JSON.parse(sessionStorage.getItem("app") || "[]");
    apps.push(values);
    sessionStorage.setItem("app", JSON.stringify(apps));
    navigate(`/createApp/appBuild?appId=${appId}`);
  };

  const failed = errorInfo => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="app-info-container">
      <div className="create-info">
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
            label="应用类型"
            name="appType"
            colon={false}
            initialValue={appType}
            rules={[
              {
                required: true
              }
            ]}
          >
            <Select
              size="large"
              placeholder="请选择应用类型"
              disabled={!!appType}
              style={{ width: "100%" }}
              options={applicationTypes}
            />
          </Form.Item>
          <Form.Item
            label="应用名称"
            name="appName"
            colon={false}
            rules={[
              {
                required: true,
                message: "请输入应用名称!"
              }
            ]}
          >
            <Input size={"large"} placeholder="请输入应用名称" />
          </Form.Item>

          <Form.Item
            label="应用id"
            name="appId"
            colon={false}
            rules={[
              {
                required: true,
                message: "请输入应用id!"
              }
            ]}
          >
            <Input size={"large"} placeholder="请输入应用id" />
          </Form.Item>

          <Form.Item
            label="创建人"
            name="creator"
            colon={false}
            rules={[
              {
                required: true,
                message: "请输入创建人!"
              }
            ]}
          >
            <Input size={"large"} placeholder="请输入创建人" />
          </Form.Item>

          <Form.Item
            label="应用描述"
            name="desc"
            colon={false}
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
            colon={false}
            wrapperCol={{
              offset: 8,
              span: 16
            }}
          >
            <Button size={"large"} type="primary" htmlType="submit">
              创建应用
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AppInfomation;

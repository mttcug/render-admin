import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Form, { useForm } from "form-render";
import { getUrlParams } from "@/assets/utils/index.js";
import { Button } from "antd";
import { DataSource, UploadImg } from "./widgets/index";
import "./index.scss";

const AppContent = props => {
  const { search } = useLocation();
  const [schema, setSchema] = useState({});
  const [appInfo, setAppInfo] = useState({});
  const form = useForm();

  useEffect(() => {
    // 根据AppId获取schema
    const appId = getUrlParams("appId", search);
    const schemasCache = JSON.parse(sessionStorage.getItem("schemas") || "{}");
    setSchema(schemasCache[appId]);

    // 根据AppId获取appInfo
    const appInfos = JSON.parse(sessionStorage.getItem("app") || "{}").find(
      item => item.appId === appId
    );
    setAppInfo(appInfos);
  }, []);

  const onFinish = (formData, errors) => {
    console.log("formData:", formData, "errors", errors);
  };

  const widgets = {
    dataSource: DataSource,
    uploadImg: UploadImg
  };

  return (
    <div className="app-content-container">
      <div className="content">
        <p className="app-title">{appInfo.appName}</p>
        <Form
          form={form}
          schema={schema}
          widgets={widgets}
          onFinish={onFinish}
        />
        <Button className="submit" type="primary" onClick={form.submit}>
          提交
        </Button>
      </div>
    </div>
  );
};

export default AppContent;

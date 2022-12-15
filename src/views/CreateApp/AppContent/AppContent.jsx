import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { getUrlParams } from "@/assets/utils/index.js";
import { Button, Empty } from "antd";
import "./index.scss";
import Form, { useForm } from "form-render";
import RenderForm from "@/components/RenderForm";

const AppContent = props => {
  const { search } = useLocation();
  const [schema, setSchema] = useState({});
  const [appInfo, setAppInfo] = useState({});

  const formRef = useRef(null);

  useEffect(() => {
    // 根据AppId获取schema
    const appId = getUrlParams("appId", search);
    const schemasCache = JSON.parse(sessionStorage.getItem("schemas") || "{}");
    setSchema(schemasCache[appId]);
    formRef.current.form.setValues({ name: "hello world" });

    // 根据AppId获取appInfo
    const appInfos = JSON.parse(sessionStorage.getItem("app") || "{}").find(
      item => item.appId === appId
    );

    setAppInfo(appInfos);
  }, []);

  // 调用表单的submit方法， 结果会在onfinish中返回
  const submit = () => {
    formRef.current.form.submit();
  };

  const finish = value => {
    // 调用接口提交数据
    console.log("-------XXXXXX:", value);
  };

  return (
    <div className="app-content-container">
      <div className="content">
        <p className="app-title">{appInfo.appName}</p>
        {schema ? (
          <RenderForm ref={formRef} schema={schema} onFinish={finish} />
        ) : (
          <Empty />
        )}
        <Button className="submit" type="primary" onClick={submit}>
          提交
        </Button>
      </div>
    </div>
  );
};

export default AppContent;

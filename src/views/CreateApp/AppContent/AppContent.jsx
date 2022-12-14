import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getUrlParams } from "@/assets/utils/index.js";
import { Button } from "antd";
import "./index.scss";
import RenderForm from "@/components/RenderForm";

const AppContent = props => {
  const { search } = useLocation();
  const [schema, setSchema] = useState({});
  const [appInfo, setAppInfo] = useState({});

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

  return (
    <div className="app-content-container">
      <div className="content">
        <p className="app-title">{appInfo.appName}</p>
        <RenderForm schema={schema} />
        <Button className="submit" type="primary">
          提交
        </Button>
      </div>
    </div>
  );
};

export default AppContent;

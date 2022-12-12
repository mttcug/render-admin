import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Generator from "fr-generator";
import "./index.scss";
import {
  defaultSettings,
  defaultCommonSettings,
  globalSettings
} from "./settings/index";
import { DataSource, UploadImg } from "./widgets/index";
import { getUrlParams } from "@/assets/utils/index.js";

const AppBuild = props => {
  const { from, pathname, search } = useLocation();
  // 创建应用的唯一标识AppId
  const appId = getUrlParams("appId", search);

  // Generator的props
  // defaultValue,
  // canDrag,
  // canDelete,
  // submit,
  // transformer: _transformer,
  // extraButtons,
  // controlButtons,
  // preview: _preview,
  // hideId,
  // getId = defaultGetId,
  // settings,
  // commonSettings,
  // globalSettings,
  // widgets = {},
  // mapping = {},
  // validation = true,
  // children,
  // fieldRender,
  // fieldWrapperRender,
  // elementRender,
  const genRef = useRef();
  const defaultValue = {
    type: "object",
    properties: {
      inputName: {
        title: "简单输入框",
        type: "string"
      }
    }
  };
  const [schema, setSchema] = useState(defaultValue);

  useEffect(() => {
    const schemasCache = JSON.parse(sessionStorage.getItem("schemas") || "{}");
    if (schemasCache[appId]) {
      setSchema(schemasCache[appId]);
    }
  }, []);

  // 获取生成器最后的结果
  const getAppFromData = () => {
    const value = genRef.current && genRef.current.getValue();
    setSchema(value);
  };

  const saveAppSchema = () => {
    const value = genRef.current && genRef.current.getValue();
    console.log("------*******:", value);
    const schemasCache = JSON.parse(sessionStorage.getItem("schemas") || "{}");
    schemasCache[appId] = value;
    sessionStorage.setItem("schemas", JSON.stringify(schemasCache));
    props.history.push(`/createApp/AppContent?appId=${appId}`);
  };

  const onChange = value => {
    console.log("------onChange:", value);
  };

  // 自定义组件
  const widgets = {
    dataSource: DataSource,
    uploadImg: UploadImg
  };
  // 组件映射
  const mappings = {
    dataSource: "dataSource",
    uploadImg: "uploadImg"
  };

  // 配置canvas上的保存按钮
  const extraButtons = [
    {
      text: "数据源",
      onClick: event => {
        getAppFromData();
      }
    },
    {
      text: "提交",
      onClick: event => {
        saveAppSchema();
      }
    }
  ];

  return (
    <div style={{ height: "85vh", background: "#fff" }}>
      <Generator
        ref={genRef}
        widgets={widgets}
        mapping={mappings}
        defaultValue={schema}
        extraButtons={extraButtons}
        settings={defaultSettings}
        globalSettings={globalSettings}
        commonSettings={defaultCommonSettings}
        onChange={onChange}
      />
    </div>
  );
};

export default AppBuild;

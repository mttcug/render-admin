import React, { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button, Checkbox, Form, Input } from "antd";
import Generator from "fr-generator";
import "antd/dist/antd.css";
import "./index.scss";
import {
  defaultSettings,
  defaultCommonSettings,
  globalSettings
} from "./settings/index";
import { dataSource, MyWidget2 } from "./widgets/index";

const CreateApp = () => {
  const { from, pathname, search } = useLocation();

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

  // 获取生成器最后的结果
  const getAppFromData = () => {
    const value = genRef.current && genRef.current.getValue();
  };

  const onChange = value => {
    console.log("------onChange:", value);
  };

  // 自定义组件
  const widgets = {
    dataSource: dataSource,
    w2: MyWidget2
  };
  // 组件映射
  const mappings = {
    dataSource: "dataSource",
    w2: "w2"
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
      text: "保存",
      onClick: event => {
        getAppFromData();
      }
    }
  ];

  return (
    <div style={{ height: "85vh", background: "#fff" }}>
      <Generator
        ref={genRef}
        widgets={widgets}
        mapping={mappings}
        defaultValue={defaultValue}
        extraButtons={extraButtons}
        settings={defaultSettings}
        globalSettings={globalSettings}
        commonSettings={defaultCommonSettings}
        onChange={onChange}
      />
    </div>
  );
};

export default CreateApp;

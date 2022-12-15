import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Generator from "fr-generator";
import {
  defaultSettings,
  defaultCommonSettings,
  globalSettings
} from "./settings/index";
import { widgets, mappings } from "./widgets/index";
import { getUrlParams } from "@/assets/utils/index.js";
import "./index.scss";

const RenderBuild = props => {
  const { search } = useLocation();

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

  const [schema, setSchema] = useState(props.schema || defaultValue);
  // schema变化时，重新设置setValue
  useEffect(() => {
    let unMount = false;
    if (!unMount) {
      setSchema(schema);
      // genRef.current.setValue(props.schema);
    }
    return () => {
      unMount = true;
    };
  }, [props.schema]);

  // 获取生成器最后的结果
  const getAppFromData = () => {
    const value = genRef.current && genRef.current.getValue();
    setSchema(value);
  };

  // 保存并提交提交schema信息
  const saveAppSchema = () => {
    const value = genRef.current && genRef.current.getValue();
    // 将schema回传给父组件
    props.submit(value);
  };

  const onChange = value => {
    props.onChange(value);
  };

  // schema变化
  const onSchemaChange = schema => {
    props.onSchemaChange(schema);
  };

  // canvas选中组件
  const onCanvasSelect = schema => {
    props.onCanvasSelect(schema);
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
      onSchemaChange={onSchemaChange}
      onCanvasSelect={onCanvasSelect}
    />
  );
};

export default RenderBuild;

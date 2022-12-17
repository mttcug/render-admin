import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getUrlParams } from "@/assets/utils/index.js";
import RenderBuild from "@/components/RenderBuild";

const AppBuild = props => {
  const { search } = useLocation();
  const navigate = useNavigate();

  // 创建应用的唯一标识AppId
  const appId = getUrlParams("appId", search);
  // 默认schama
  const defaultValue = {
    type: "object",
    properties: {
      inputName: {
        title: "简单输入框",
        type: "string"
      }
    }
  };
  // 传给表单设计器的schema
  const [schema, setSchema] = useState(defaultValue);
  // 表单设计器当前选中的组件的schema
  const [curSchema, setCurSchema] = useState({});

  useEffect(() => {
    let unMount = false;
    if (!unMount) {
      const schemasCache = JSON.parse(
        sessionStorage.getItem("schemas") || "{}"
      );
      if (schemasCache[appId]) {
        setSchema(schemasCache[appId]);
      }
    }
    return () => {
      unMount = true;
    };
  }, [appId]);

  const saveAppSchema = schema => {
    const schemasCache = JSON.parse(sessionStorage.getItem("schemas") || "{}");
    schemasCache[appId] = schema;
    sessionStorage.setItem("schemas", JSON.stringify(schemasCache));
    navigate(`/createApp/AppContent?appId=${appId}`);
  };
  // 监听表单设计器schema变化
  const onSchemaChange = schema => {
    const _schema = { ...schema };
    const { properties = {} } = schema;
    const { $id = "", dataSource = {} } = curSchema;
    const id = String($id).replace("#/", "");
    // 判断dataSource变化
    if (
      properties[id] &&
      properties[id].dataSource &&
      dataSource.label !== properties[id].dataSource.label
    ) {
      const data =
        (properties[id].dataSource && properties[id].dataSource.data) || [];
      _schema.properties[id].enum = data.map((_, index) => index);
      _schema.properties[id].enumNames = data.map((_, index) => _.name);
      setSchema(_schema);
    }
  };

  // 表单设计器中组件被选中
  const onCanvasSelect = (schema = {}) => {
    setCurSchema(schema);
  };

  const onChange = () => {
    console.log("change");
  };

  return (
    <div style={{ height: "85vh", background: "#fff" }}>
      <RenderBuild
        schema={schema}
        submit={saveAppSchema}
        onChange={onChange}
        onSchemaChange={onSchemaChange}
        onCanvasSelect={onCanvasSelect}
      />
    </div>
  );
};

export default AppBuild;

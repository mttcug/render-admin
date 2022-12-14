import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { getUrlParams } from "@/assets/utils/index.js";
import "./index.scss";
import RenderBuild from "@/components/RenderBuild";

const AppBuild = props => {
  const { search } = useLocation();

  // 创建应用的唯一标识AppId
  const appId = getUrlParams("appId", search);
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
  const [curSchema, setCurSchema] = useState("");

  useEffect(() => {
    const schemasCache = JSON.parse(sessionStorage.getItem("schemas") || "{}");
    if (schemasCache[appId]) {
      setSchema(schemasCache[appId]);
    }
  }, []);

  const saveAppSchema = schema => {
    const schemasCache = JSON.parse(sessionStorage.getItem("schemas") || "{}");
    schemasCache[appId] = schema;
    sessionStorage.setItem("schemas", JSON.stringify(schemasCache));
    props.history.push(`/createApp/AppContent?appId=${appId}`);
  };

  const onChange = value => {
    console.log("-----onChange:", value);
  };

  const onSchemaChange = schema => {
    const _schema = { ...schema };
    const { properties = {} } = schema;
    const { $id, dataSource } = curSchema;
    const id = String($id).replace("#/", "");
    if (properties[id] && dataSource !== properties[id].dataSource) {
      const data = { name: "claire", age: "18" };
      _schema.properties[id].enum = Object.keys(data);
      _schema.properties[id].enumNames = Object.values(data);
      console.log("-----变化了");
      setSchema(_schema);
      // dataSource变化
    }
    console.log("-----onSchemaChange:", properties, curSchema);
  };

  const onCanvasSelect = schema => {
    const { $id } = schema;
    setCurSchema(schema);
    console.log("-----onCanvasSelect:", String($id).replace("#/", ""));
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

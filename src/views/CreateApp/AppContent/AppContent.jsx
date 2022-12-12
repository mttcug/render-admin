import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FormRender, { useForm } from "form-render";
import { getUrlParams } from "@/assets/utils/index.js";
import { Button } from "antd";

const AppContent = props => {
  const { from, pathname, search } = useLocation();
  const appId = getUrlParams("appId", search);
  const [schema, setSchema] = useState({});
  const form = useForm();

  useEffect(() => {
    const schemasCache = JSON.parse(sessionStorage.getItem("schemas") || "{}");
    setSchema(schemasCache[appId]);
    console.log("-------KKKKKK:", appId, schemasCache[appId]);
  }, []);

  const onFinish = (formData, errors) => {
    console.log("formData:", formData, "errors", errors);
  };

  return (
    <div>
      <FormRender form={form} schema={schema} onFinish={onFinish} />
      <Button type="primary" onClick={form.submit}>
        提交
      </Button>
    </div>
  );
};

export default AppContent;

import React, { useEffect, useState } from "react";
import Form, { useForm } from "form-render";
import { widgets } from "@/components/RenderBuild/widgets/index";

const RenderForm = props => {
  const [schema, setSchema] = useState({});
  const form = useForm();

  useEffect(() => {
    setSchema(props.schema);
  }, [props.schema]);

  const onFinish = (formData, errors) => {
    console.log("formData:", formData, "errors", errors);
  };

  return (
    <Form form={form} schema={schema} widgets={widgets} onFinish={onFinish} />
  );
};

export default RenderForm;

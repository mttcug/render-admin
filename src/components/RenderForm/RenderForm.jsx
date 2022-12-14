import React, { useEffect, useState } from "react";
import Form, { useForm } from "form-render";
import {
  DataSource,
  UploadImg,
  TableModel,
  SimpleTable
} from "../RenderBuild/widgets/index";

const RenderForm = props => {
  const [schema, setSchema] = useState({});
  const form = useForm();

  useEffect(() => {
    setSchema(props.schema);
  }, [props.schema]);

  const onFinish = (formData, errors) => {
    console.log("formData:", formData, "errors", errors);
  };

  const widgets = {
    dataSource: DataSource,
    uploadImg: UploadImg,
    tableModel: TableModel,
    simpleTable: SimpleTable
  };

  return (
    <Form form={form} schema={schema} widgets={widgets} onFinish={onFinish} />
  );
};

export default RenderForm;

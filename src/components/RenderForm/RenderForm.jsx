import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef
} from "react";
import Form, { useForm } from "form-render";
import { widgets } from "@/components/RenderBuild/widgets/index";

const RenderForm = forwardRef((props, ref) => {
  const [schema, setSchema] = useState({});
  const form = useForm();

  useImperativeHandle(ref, () => ({
    form: form
  }));

  useEffect(() => {
    setSchema(props.schema);
  }, [props.schema]);

  const onFinish = (formData, errors) => {
    props.onFinish(formData);
    console.log("formData:", formData, "errors", errors);
  };

  return (
    <Form
      ref={ref}
      form={form}
      schema={schema}
      widgets={widgets}
      onFinish={onFinish}
    />
  );
});

export default RenderForm;

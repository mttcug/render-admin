export const originTypeMapping = {
  default: "input",
  string: "input",
  array: "list",
  boolean: "checkbox",
  integer: "number",
  number: "number",
  object: "map",
  html: "html",
  "string:upload": "upload",
  "string:url": "url",
  "string:dateTime": "date",
  "string:date": "date",
  "string:year": "date",
  "string:month": "date",
  "string:week": "date",
  "string:quarter": "date",
  "string:time": "time",
  "string:textarea": "textarea",
  "string:color": "color",
  "string:image": "imageInput",
  "range:time": "timeRange",
  "range:dateTime": "dateRange",
  "range:date": "dateRange",
  "range:year": "dateRange",
  "range:month": "dateRange",
  "range:week": "dateRange",
  "range:quarter": "dateRange",
  "*?enum": "radio",
  "*?enum_long": "select",
  "array?enum": "checkboxes",
  "array?enum_long": "multiSelect",
  "*?readOnly": "html" // TODO: html widgets for list / object
};

// cx 新添加的组件类型
export const addTypeMapping = {
  table: "table"
};

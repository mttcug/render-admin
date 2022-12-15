import DataSource from "./DataSource.jsx";
import UploadImg from "./UploadImg.jsx";
import TableModel from "./TableModel.jsx";
import SimpleTable from "./Table.jsx";
import TableSetting from "./TableSetting.jsx";

export { DataSource, UploadImg, TableModel, SimpleTable, TableSetting };

export const widgets = {
  dataSource: DataSource,
  uploadImg: UploadImg,
  tableModel: TableModel,
  simpleTable: SimpleTable,
  tableSetting: TableSetting
};

export const mappings = {
  dataSource: "dataSource",
  uploadImg: "uploadImg",
  tableModel: "tableModel",
  simpleTable: "simpleTable",
  tableSetting: "tableSetting"
};

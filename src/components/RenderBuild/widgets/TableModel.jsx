import React, { useEffect } from "react";
import { Search, Table, useTable, withTable } from "table-render";
import { InfoCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, message, Space, Tag, Tooltip } from "antd";
import { tableDataApi } from "@/interface/index.js";
import umiRequest from "@/interface/request";

const TableModel = props => {
  const { onChange, schema = {} } = props;
  const { dataSource = "", tableConfig = {} } = schema;
  const { needSearch, searchAlias } = tableConfig;

  // 配置完全透传antd table
  let columns = [];

  let _schema = {
    type: "object",
    properties: {},
    labelWidth: 80
  };

  // 选择数据源
  console.log("-----iiiii:,", props);
  if (dataSource) {
    const btns = {
      title: "操作",
      render: () => (
        <Space>
          <a target="_blank" key="1">
            <div
              onClick={() => {
                message.success("预订成功");
              }}
            >
              编辑
            </div>
          </a>
          <a target="_blank" key="2">
            <div
              onClick={() => {
                message.success("预订成功");
              }}
            >
              删除
            </div>
          </a>
        </Space>
      )
    };
    // 根据数据源， 并根据数据源提供的接口名称 请求数据
    const { data } = dataSource;
    columns = data.map(item => {
      const { value, label, type } = item;
      return {
        title: value,
        dataIndex: label,
        valueType: type,
        width: "20%"
      };
    });
    columns.push(btns);
    searchAlias &&
      searchAlias.map(_value => {
        const target = data.find(item => item.value === _value) || {};
        target.label &&
          (_schema.properties[target.label] = {
            title: target.value,
            type: target.type,
            width: "20%"
          });
      });
    console.log("------_schema:", _schema);
  }

  const { refresh } = useTable();

  // 请求数据集数据填充表格
  const searchApi = (params, sorter) => {
    console.group(sorter);
    return umiRequest({
      method: "get",
      url: tableDataApi,
      params
    })
      .then(res => {
        console.log("-------99999:", res);
        if (res && res.data) {
          return {
            rows: [...res.data, { money: null }],
            total: res.data.length
          };
        }
      })
      .catch(e => {
        console.log("Oops, error", e);

        // 注意一定要返回 rows 和 total
        return {
          rows: [],
          total: 0
        };
      });
  };

  const showData = () => {
    refresh(null, { extra: 1 });
  };

  useEffect(() => {}, []);

  return (
    <div>
      <Search
        hidden={!needSearch}
        schema={_schema}
        displayType="row"
        api={searchApi}
      />
      <Table
        pagination={{ pageSize: 4 }}
        columns={columns}
        rowKey="id"
        toolbarRender={() => []}
        toolbarAction
      />
    </div>
  );
};

export default withTable(TableModel);

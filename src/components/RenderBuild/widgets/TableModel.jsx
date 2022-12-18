import React, { useState, useEffect } from "react";
import { Search, Table, useTable, withTable } from "table-render";
import { message, Space } from "antd";
import umiRequest from "@/interface/request";

const TableModel = props => {
  const { schema = {} } = props;
  const { dataSource = "", tableConfig = {} } = schema;
  const { needSearch, searchAlias = [] } = tableConfig;

  // 搜索框的schema和表头
  //   const [searchSchema, setSearchSchema] = useState(defaultSearchSchema)
  //   const [columns, setColumns] = useState([])

  // 根据数据源， 并根据数据源提供的接口名称 请求数据
  const { data = [], url = "" } = dataSource;

  const { refresh } = useTable();

  let columns = [];
  let searchSchema = {
    type: "object",
    properties: {},
    labelWidth: 80
  };
  // 表头字段
  // 选择数据源
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
    columns =
      data &&
      data.map(item => {
        const { value: _value, label: _label, type: _type } = item;
        return {
          title: _value,
          dataIndex: _label,
          valueType: _type,
          width: "20%"
        };
      });
    console.log("------&&&&&:", columns);
    columns.push(btns);
  }

  // 搜索依赖的字段
  searchAlias &&
    searchAlias.map(alias => {
      const target = data.find(item => item.value === alias) || {};
      target.label &&
        (searchSchema.properties[target.label] = {
          title: target.value,
          type: target.type,
          width: "20%"
        });
    });

  // 请求数据集数据填充表格
  const searchApi =
    url &&
    ((params, sorter) => {
      console.log("-----url0", url);
      return umiRequest({
        method: "get",
        url: url,
        params
      })
        .then(res => {
          const data = res;
          console.log("-----url1", res);
          if (data) {
            return {
              rows: [...data, { money: null }],
              total: data.length
            };
          }
        })
        .catch(e => {
          console.log("-----url2", url);
          console.log("Oops, error", e);

          // 注意一定要返回 rows 和 total
          return {
            rows: [],
            total: 0
          };
        });
    });

  const showData = () => {
    refresh(null, { extra: 1 });
  };

  return (
    <div>
      {url ? (
        <Search
          hidden={!needSearch}
          schema={searchSchema}
          displayType="row"
          api={searchApi}
        />
      ) : null}
      <Table
        pagination={{ pageSize: 2 }}
        columns={columns}
        rowKey="index"
        toolbarRender={() => []}
        toolbarAction
      />
    </div>
  );
};

export default withTable(TableModel);

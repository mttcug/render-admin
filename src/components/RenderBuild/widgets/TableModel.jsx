import React, { useEffect, useState } from "react";
import { Search, Table, useTable, withTable } from "table-render";
import { message, Space } from "antd";
import umiRequest from "@/interface/request";

const TableModel = props => {
  const { onChange, schema = {} } = props;
  const { dataSource = "", tableConfig = {} } = schema;
  const { needSearch, searchAlias } = tableConfig;
  // 根据数据源， 并根据数据源提供的接口名称 请求数据
  const { data = [], value, label, url = "" } = dataSource;

  const { refresh } = useTable();

  // 配置完全透传antd table
  let columns = [];

  let _schema = {
    type: "object",
    properties: {},
    labelWidth: 80
  };

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
    columns = data.map(item => {
      const { value: _value, label: _label, type: _type } = item;
      return {
        title: _value,
        dataIndex: _label,
        valueType: _type,
        width: "20%"
      };
    });
    columns.push(btns);
    searchAlias &&
      searchAlias.map(alias => {
        const target = data.find(item => item.value === alias) || {};
        target.label &&
          (_schema.properties[target.label] = {
            title: target.value,
            type: target.type,
            width: "20%"
          });
      });
  }

  // 请求数据集数据填充表格
  const searchApi = (params, sorter) => {
    if (!url) return {};
    return umiRequest({
      method: "get",
      url: url,
      params
    })
      .then(res => {
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

  return (
    <div>
      <Search
        hidden={!needSearch}
        schema={_schema}
        displayType="row"
        api={((params, sorter) => {
          console.log("-----^^^^^^");
          return searchApi;
        })()}
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

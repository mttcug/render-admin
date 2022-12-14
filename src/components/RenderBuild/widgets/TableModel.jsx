import React, { useEffect } from "react";
import { Search, Table, useTable, withTable } from "table-render";
import { InfoCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, message, Space, Tag, Tooltip } from "antd";
import request from "umi-request";

const schema = {
  type: "object",
  properties: {
    state: {
      title: "酒店状态",
      type: "string",
      enum: ["open", "closed"],
      enumNames: ["营业中", "已打烊"],
      width: "25%",
      widget: "select"
    },
    labels: {
      title: "酒店星级",
      type: "string",
      width: "25%"
    },
    created_at: {
      title: "成立时间",
      type: "string",
      format: "date",
      width: "25%"
    }
  },
  labelWidth: 80
};

const TableModel = props => {
  const { onChange, schema } = props;
  const { dataSource = "" } = schema;

  // 配置完全透传antd table
  let columns = [];

  // 选择数据源
  console.log("-----iiiii:,", dataSource);
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
    columns = [
      {
        title: "应用名称",
        dataIndex: "title",
        valueType: "text",
        width: "20%"
      },
      {
        title: "应用Id",
        dataIndex: "address",
        ellipsis: true,
        copyable: true,
        valueType: "text",
        width: "25%"
      },
      {
        title: "应用状态",
        enum: {
          open: "营业中",
          closed: "已打烊"
        },
        dataIndex: "state"
      },
      {
        title: "应用星级",
        dataIndex: "labels"
      },

      {
        title: "应用GMV",
        key: "money",
        sorter: true,
        dataIndex: "money",
        valueType: "money"
      },
      {
        title: "成立时间",
        key: "created_at",
        dataIndex: "created_at",
        valueType: "date"
      }
    ];
    columns.push(btns);
  }

  const { refresh } = useTable();

  // 请求数据集数据填充表格
  const searchApi = (params, sorter) => {
    console.group(sorter);
    return request
      .get(
        "https://www.fastmock.site/mock/62ab96ff94bc013592db1f67667e9c76/getTableList/api/basic",
        { params }
      )
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

  useEffect(() => {
    onChange("");
  }, []);

  return (
    <div>
      <Search hidden schema={schema} displayType="row" api={searchApi} />
      <Table
        pagination={{ pageSize: 4 }}
        columns={columns}
        rowKey="id"
        toolbarRender={() => [
          <Button key="show" onClick={showData}>
            查看日志
          </Button>,
          <Button key="out" onClick={showData}>
            导出数据
          </Button>,
          <Button
            key="primary"
            type="primary"
            onClick={() => alert("table-render！")}
          >
            <PlusOutlined />
            创建
          </Button>
        ]}
        toolbarAction
      />
    </div>
  );
};

export default withTable(TableModel);

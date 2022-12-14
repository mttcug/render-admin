import { Space, Table, Tag } from "antd";
import React, { useState, useEffect } from "react";
import { tableDataApi } from "@/interface/index.js";
import umiRequest from "@/interface/request";

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"]
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"]
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"]
  }
];
const SimpleTable = props => {
  const { onChange, schema } = props;
  const { dataSource = {} } = schema;
  const { data: _data = [], value, label, url = "" } = dataSource;

  const [columns, setCloumns] = useState([]);
  const [data, setTableData] = useState([]);

  const getTableData = () => {
    return umiRequest({
      method: "get",
      url
    });
  };

  useEffect(() => {
    let unMounted = false;

    const getData = async () => {
      const result = await getTableData();
      console.log("-------getTableData:", result);
      if (result && Object.keys(result).length && !unMounted) {
        setTableData(result);
      }
    };

    const _columns = _data.map(item => {
      return {
        title: item.name,
        dataIndex: item.label,
        key: item.label
      };
    });
    setCloumns(_columns);
    getData();
    return () => {
      unMounted = true;
    };
  }, [value]);

  return <Table columns={columns} dataSource={data} />;
};
export default SimpleTable;

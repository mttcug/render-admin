import { Space, Table, Tag, Modal } from "antd";
import React, { useState, useEffect } from "react";
import { tableDataApi } from "@/interface/index.js";
import umiRequest from "@/interface/request";

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

  // 每当dataSource变化重新请求
  useEffect(() => {
    let unMounted = false;

    const getData = async () => {
      const result = await getTableData();
      if (result && Object.keys(result).length && !unMounted) {
        setTableData(result);
      }
    };

    const _columns = _data.map(item => {
      return {
        title: item.value,
        dataIndex: item.label,
        key: item.label
      };
    });
    _data.length > 0 && _columns.push(action);
    setCloumns(_columns);
    getData();
    return () => {
      unMounted = true;
    };
  }, [value]);

  // 操作
  const action = {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a onClick={showModal}>编辑</a>
        <a onClick={showModal}>删除</a>
      </Space>
    ),
    width: "20%"
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Table columns={columns} dataSource={data} />
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};
export default SimpleTable;

import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { DatabaseOutlined } from "@ant-design/icons";
import { dataSourceApi } from "@/interface/index.js";
import umiRequest from "@/interface/request";

/**
 * 从数据库绑定数据
 * @returns
 */
const DataSource = props => {
  const { Option } = Select;
  // 这里的onChange很重要， 把最终的值获取到穿出去，schema才能获取到
  const { onChange } = props;
  const [dataSource, setDataSource] = useState([]);

  const change = value => {
    const target = dataSource.find(item => item.value === value);
    onChange(target);
  };

  const onSearch = value => {
    console.log("search:", value);
  };

  /**
   * description 获取dataSource
   */
  const getDataSource = async () => {
    const result = await umiRequest({
      method: "get",
      url: dataSourceApi,
      params: {}
    });
    return result;
  };

  useEffect(() => {
    let unMount = false;
    const getData = async () => {
      const result = await getDataSource();
      if (result && !unMount) {
        setDataSource(result);
      }
    };
    getData();
    return () => {
      unMount = true;
    };
  }, []);

  return (
    <Select
      showSearch
      placeholder="Select a person"
      optionFilterProp="children"
      onChange={change}
      onSearch={onSearch}
      filterOption={(input, option) =>
        (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
      }
    >
      {dataSource.map(item => (
        <Option value={item.value} key={item.label}>
          <DatabaseOutlined style={{ color: "#1890ff", marginRight: 10 }} />
          {item.label}
        </Option>
      ))}
    </Select>
  );
};

export default DataSource;

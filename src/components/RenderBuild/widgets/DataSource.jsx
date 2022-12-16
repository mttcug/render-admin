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
  const { onChange, addons = {} } = props;
  const { formData = {} } = addons;
  const [dataSource, setDataSource] = useState([]);

  // 从addons中获取选中的值进行回填
  const defaultValue = formData.dataSource && formData.dataSource.value;

  const change = value => {
    // onChange将DataSource组件的值传出去作为schema.dataSource属性给canvas的组件使用
    const target = dataSource.find(item => item.value === value);
    onChange(target);
  };

  const onSearch = value => {
    console.log("search:", value);
  };

  // description 获取dataSource
  const getDataSource = async () => {
    const result = await umiRequest({
      method: "get",
      url: dataSourceApi,
      params: {}
    });
    return result.length || Object.keys(result).length ? result : [];
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
      placeholder="请选择数据集"
      defaultValue={defaultValue}
      onChange={change}
      onSearch={onSearch}
      style={{ width: "100%" }}
    >
      {dataSource &&
        dataSource.map(item => (
          <Option value={item.value} key={item.label} label={item.label}>
            <DatabaseOutlined style={{ color: "#1890ff", marginRight: 10 }} />
            {item.value}
          </Option>
        ))}
    </Select>
  );
};

export default DataSource;

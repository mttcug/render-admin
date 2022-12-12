import React from "react";
import { Select } from "antd";
import { DatabaseOutlined } from "@ant-design/icons";

/**
 * 从数据库绑定数据
 * @returns
 */
const DataSource = props => {
  const { Option } = Select;
  // 这里的onChange很重要， 把最终的值获取到穿出去，schema才能获取到
  const { onChange } = props;
  const change = value => {
    onChange(value);
    console.log(`selected ${value}`);
  };
  const onSearch = value => {
    console.log("search:", value);
  };
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
      {[
        {
          value: "jack",
          label: "Jack"
        },
        {
          value: "lucy",
          label: "Lucy"
        },
        {
          value: "tom",
          label: "Tom"
        }
      ].map(item => (
        <Option value={item.value}>
          <DatabaseOutlined style={{ color: "#1890ff", marginRight: 10 }} />
          {item.label}
        </Option>
      ))}
    </Select>
  );
};

export default DataSource;

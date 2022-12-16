import React, { useEffect, useState } from "react";
import { Collapse, Checkbox, Tag } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

/**
 * 从数据库绑定数据
 * @returns
 */
const TableSetting = props => {
  const { Panel } = Collapse;
  // 这里的onChange很重要， 把最终的值获取到穿出去，schema才能获取到
  const { onChange, addons = {} } = props;
  const { formData = {} } = addons;
  const { dataSource = {}, tableConfig = {} } = formData;
  const { data = [] } = dataSource;

  const [needSearch, setNeedSearch] = useState(false);
  const [searchAlias, setSearchAlias] = useState([]);

  // 回填设置的值
  useEffect(() => {
    const { needSearch, searchAlias } = tableConfig;
    setNeedSearch(needSearch);
    setSearchAlias(searchAlias);
  }, []);

  const settingChange = () => {};

  // 是否需要显示搜索框
  const searchChange = value => {
    const {
      target: { checked }
    } = value;
    setNeedSearch(!!checked);
    onChange({
      needSearch: !!checked
    });
  };

  // 搜索框的依赖是什么
  const searchAliasChange = value => {
    if (value && value.length > 3) {
      setSearchAlias(value.slice(0, 3));
      return;
    }
    onChange({
      needSearch: true,
      searchAlias: value
    });
  };

  return (
    <Collapse defaultActiveKey={["1"]} onChange={settingChange}>
      <Panel header="配置" key="1">
        <div className="table-setting-search-need">
          是否需要搜索框：
          <Checkbox checked={needSearch} onChange={searchChange}>
            需要
          </Checkbox>
        </div>
        <br />
        {needSearch ? (
          <div>
            搜索框字段：
            <Tag icon={<ExclamationCircleOutlined />} color="warning">
              最多可选三个
            </Tag>
            <Checkbox.Group
              options={data}
              defaultValue={searchAlias}
              onChange={searchAliasChange}
            />
          </div>
        ) : null}
      </Panel>
    </Collapse>
  );
};

export default TableSetting;

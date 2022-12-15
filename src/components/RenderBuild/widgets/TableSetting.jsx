import React, { useEffect, useState } from "react";
import { Collapse, Checkbox } from "antd";

/**
 * 从数据库绑定数据
 * @returns
 */
const TableSetting = props => {
  const { Panel } = Collapse;
  // 这里的onChange很重要， 把最终的值获取到穿出去，schema才能获取到
  const { onChange, addons = {} } = props;
  const { formData = {} } = addons;
  const dataSource = formData.dataSource || {};
  const { data = [], value = "", label = "", url = "" } = dataSource;

  const [options, setOptions] = useState([]);
  const [needSearch, setNeedSearch] = useState(false);

  const settingChange = () => {};

  const searchChange = value => {
    const {
      target: { checked }
    } = value;
    setNeedSearch(!!checked);
    onChange({
      needSearch: !!checked
    });
    console.log("---------ccccc:", checked);
  };

  const searchAliasChange = value => {
    onChange({
      needSearch: true,
      searchAlias: value
    });
    console.log("---------ddddddd:", value);
  };

  useEffect(() => {
    let unMount = false;
    if (!unMount) {
      setOptions(data);
    }
    return () => {
      unMount = true;
    };
  }, []);

  return (
    <Collapse defaultActiveKey={["1"]} onChange={settingChange}>
      <Panel header="配置" key="1">
        <div>
          是否需要搜索框：<Checkbox onChange={searchChange}>需要</Checkbox>
        </div>
        {needSearch ? (
          <div>
            搜索框字段：
            <Checkbox.Group
              options={options}
              defaultValue={[]}
              onChange={searchAliasChange}
            />
          </div>
        ) : null}
      </Panel>
    </Collapse>
  );
};

export default TableSetting;

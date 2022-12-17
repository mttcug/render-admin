import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Menu } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";

const CustomMenu = props => {
  const { menu } = props;

  const [openKeys, setOpenKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [items, setItems] = useState([]);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  // 处理 pathname
  const getOpenKeys = string => {
    let newStr = "",
      newArr = [],
      arr = string.split("/").map(i => "/" + i);
    for (let i = 1; i < arr.length - 1; i++) {
      newStr += arr[i];
      newArr.push(newStr);
    }
    return newArr;
  };

  useEffect(() => {
    let { home, quickStart, applications } = menu;
    const _items = [home, quickStart, applications];
    setItems(_items);
  }, [menu]);

  useEffect(() => {
    setOpenKeys([pathname]);
    setSelectedKeys(getOpenKeys(pathname));
  }, [pathname]);

  // 只展开一个 SubMenu
  const onOpenChange = openKeys => {
    if (openKeys.length === 0 || openKeys.length === 1) {
      setOpenKeys({
        openKeys
      });
      return;
    }

    // 最新展开的 SubMenu
    const latestOpenKey = openKeys[openKeys.length - 1];

    // 这里与定义的路由规则有关
    if (latestOpenKey.includes(openKeys[0])) {
      setOpenKeys({
        openKeys
      });
    } else {
      setOpenKeys({
        openKeys: [latestOpenKey]
      });
    }
  };

  return (
    <Menu
      mode="inline"
      theme="dark"
      defaultOpenKeys={openKeys}
      defaultSelectedKeys={selectedKeys}
      onClick={({ key }) => {
        setSelectedKeys([key]);
        navigate(key);
      }}
      onOpenChange={onOpenChange}
      items={items}
    />
  );
};

CustomMenu.propTypes = {
  menu: PropTypes.object.isRequired
};

export default CustomMenu;

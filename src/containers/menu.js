import React from "react";
import {
  HomeOutlined,
  PlusCircleOutlined,
  AppstoreAddOutlined,
  DatabaseOutlined,
  CopyOutlined
} from "@ant-design/icons";

const menu = {
  home: {
    key: "/index",
    title: "首页",
    icon: <HomeOutlined />,
    auth: [1]
  },
  quickStart: {
    key: "/createApp/appInfo",
    title: "快速开始",
    auth: [0],
    subs: [
      {
        title: "创建应用",
        key: "/createApp/appInfo",
        icon: <PlusCircleOutlined />
      }
    ]
  },
  applications: {
    key: "/apps/applications",
    title: "应用开发",
    auth: [1],
    subs: [
      {
        title: "应用",
        key: "/apps/applications",
        icon: <AppstoreAddOutlined />
      },
      {
        title: "数据源",
        key: "/apps/dataSource/",
        icon: <DatabaseOutlined />,
        subs: [
          {
            title: "数据模型",
            key: "/apps/dataSource/models",
            icon: <PlusCircleOutlined />
          },
          {
            title: "通用选项集",
            key: "/apps/dataSource/commonModels",
            icon: <PlusCircleOutlined />
          },
          {
            title: "Apis",
            key: "/apps/dataSource/apis",
            icon: <PlusCircleOutlined />
          }
        ]
      },
      { title: "模版", key: "/public/template", icon: <CopyOutlined /> }
    ]
  }
};

export default menu;

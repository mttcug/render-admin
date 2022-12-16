import React from "react";
import {
  HomeOutlined,
  PlusCircleOutlined,
  AppstoreAddOutlined,
  DatabaseOutlined,
  CopyOutlined,
  RadarChartOutlined,
  DropboxOutlined
} from "@ant-design/icons";

const menu = {
  home: {
    key: "/index",
    label: "首页",
    icon: <HomeOutlined />,
    auth: [1]
  },
  quickStart: {
    key: "",
    label: "快速开始",
    icon: <RadarChartOutlined />,
    auth: [0],
    children: [
      {
        label: "创建应用",
        key: "/createApp/appInfo",
        icon: <PlusCircleOutlined />
      }
    ]
  },
  applications: {
    key: "/",
    label: "应用开发",
    icon: <DropboxOutlined />,
    auth: [1],
    children: [
      {
        label: "应用",
        key: "/apps/applications",
        icon: <AppstoreAddOutlined />
      },
      {
        label: "数据源",
        key: "/apps/dataSource/",
        icon: <DatabaseOutlined />,
        children: [
          {
            label: "数据模型",
            key: "/apps/dataSource/models",
            icon: <PlusCircleOutlined />
          },
          {
            label: "通用选项集",
            key: "/apps/dataSource/commonModels",
            icon: <PlusCircleOutlined />
          },
          {
            label: "Apis",
            key: "/apps/dataSource/apis",
            icon: <PlusCircleOutlined />
          }
        ]
      },
      { label: "模版", key: "/public/template", icon: <CopyOutlined /> }
    ]
  }
};

export default menu;

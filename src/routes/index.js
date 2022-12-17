import React from "react";
import loadable from "@/utils/loadable";
import { Navigate } from "react-router-dom";

// 公共模块
const DefaultLayout = loadable(() =>
  import(/* webpackChunkName: 'default' */ "@/containers")
);
// 基础页面
const View404 = loadable(() =>
  import(/* webpackChunkName: '404' */ "@/views/Others/404")
);
const View500 = loadable(() =>
  import(/* webpackChunkName: '500' */ "@/views/Others/500")
);
const Login = loadable(() =>
  import(/* webpackChunkName: 'login' */ "@/views/Login")
);

const Index = loadable(() =>
  import(/* webpackChunkName: 'index' */ "@/views/Index")
);

// 通用
const AppInfomation = loadable(() =>
  import(/* webpackChunkName: 'AppInfomation' */ "@/views/CreateApp/AppInfo")
);
const AppBuild = loadable(() =>
  import(/* webpackChunkName: 'AppBuild' */ "@/views/CreateApp/AppBuild")
);
const AppContent = loadable(() =>
  import(/* webpackChunkName: 'AppContent' */ "@/views/CreateApp/AppContent")
);
const Applications = loadable(() =>
  import(/* webpackChunkName: 'Applications' */ "@/views/Apps/Applications")
);

const DataSource = loadable(() =>
  import(
    /* webpackChunkName: 'DataSource' */ "@/views/Apps/DataSource/DataSource"
  )
);
const CommonModel = loadable(() =>
  import(
    /* webpackChunkName: 'CommonModel' */ "@/views/Apps/DataSource/CommonModel"
  )
);
const Apis = loadable(() =>
  import(/* webpackChunkName: 'Apis' */ "@/views/Apps/DataSource/Apis")
);

const About = loadable(() =>
  import(/* webpackChunkName: 'about' */ "@/views/About")
);

// view中的路由
const viewRoutes = [
  { path: "/", exact: true, name: "Index", element: <Index />, auth: [1] },
  {
    path: "/createApp/appInfo",
    exact: false,
    name: "创建应用",
    element: <AppInfomation />,
    auth: [1]
  },
  {
    path: "/createApp/appBuild",
    exact: false,
    name: "应用搭建",
    element: <AppBuild />,
    auth: [1]
  },
  {
    path: "/createApp/AppContent",
    exact: false,
    name: "应用内容",
    element: <AppContent />,
    auth: [1]
  },
  {
    path: "/apps/dataSource/models",
    exact: false,
    name: "数据模型",
    element: <DataSource />,
    auth: [1]
  },
  {
    path: "/apps/dataSource/commonModels",
    exact: false,
    name: "通用选项集",
    element: <CommonModel />,
    auth: [1]
  },
  {
    path: "/apps/dataSource/apis",
    exact: false,
    name: "Apis",
    element: <Apis />,
    auth: [1]
  },
  {
    path: "/apps/applications",
    exact: false,
    name: "应用",
    element: <Applications />,
    auth: [1]
  },
  { path: "/about", exact: false, name: "关于", element: <About />, auth: [1] }
];

// 基础路由
const routes = [
  {
    path: "/",
    element: <DefaultLayout />,
    children: viewRoutes
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/500",
    element: <View500 />
  },
  {
    path: "/400",
    element: <View404 />
  },
  {
    path: "*",
    element: <Navigate to="/" replace={true} />
  }
];

export { routes, viewRoutes };

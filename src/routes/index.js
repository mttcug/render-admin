import loadable from "@/utils/loadable";

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

const routes = [
  { path: "/index", exact: true, name: "Index", component: Index, auth: [1] },
  {
    path: "/createApp/appInfo",
    exact: false,
    name: "创建应用",
    component: AppInfomation,
    auth: [1]
  },
  {
    path: "/createApp/appBuild",
    exact: false,
    name: "应用搭建",
    component: AppBuild,
    auth: [1]
  },
  {
    path: "/createApp/AppContent",
    exact: false,
    name: "应用内容",
    component: AppContent,
    auth: [1]
  },
  {
    path: "/apps/dataSource/models",
    exact: false,
    name: "数据模型",
    component: DataSource,
    auth: [1]
  },
  {
    path: "/apps/dataSource/commonModels",
    exact: false,
    name: "通用选项集",
    component: CommonModel,
    auth: [1]
  },
  {
    path: "/apps/dataSource/apis",
    exact: false,
    name: "Apis",
    component: Apis,
    auth: [1]
  },
  {
    path: "/apps/applications",
    exact: false,
    name: "应用",
    component: Applications,
    auth: [1]
  },
  { path: "/about", exact: false, name: "关于", component: About, auth: [1] }
];

export default routes;

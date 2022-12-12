import loadable from "@/utils/loadable";

const Index = loadable(() =>
  import(/* webpackChunkName: 'index' */ "@/views/Index")
);

// 通用
const AppInfomation = loadable(() =>
  import(/* webpackChunkName: 'AppInfomation' */ "@/views/CreateApp/AppInfo")
);
const AppBuild = loadable(() =>
  import(
    /* webpackChunkName: 'AppBuild' */ "@/views/CreateApp/AppContent/AppBuild"
  )
);
const AppContent = loadable(() =>
  import(
    /* webpackChunkName: 'AppContent' */ "@/views/CreateApp/AppContent/AppContent"
  )
);
const Applications = loadable(() =>
  import(/* webpackChunkName: 'Applications' */ "@/views/Apps/Applications")
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
    path: "/apps/applications",
    exact: false,
    name: "应用",
    component: Applications,
    auth: [1]
  },
  { path: "/about", exact: false, name: "关于", component: About, auth: [1] }
];

export default routes;

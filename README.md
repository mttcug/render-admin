### 技术栈

`React@16.10.1 + React-Router@5.1.1 + Redux@4.0.4 + Antd@3.23.5 + Fetch`

> `Create React App` 脚手架工具快速搭建项目结构

> `react-redux@7.1.1` 配合 `Redux` 更舒心

> `animate.css@3.7.2` 页面动画展示

> `x-render` 低代码库

> `umi-request@1.4.0` 基于 fetch 的请求库

> `screenfull@5.0.0` 全屏插件

> `prettier@1.18.2` 代码风格统一

### 基本功能

- [x] 路由懒加载
- [x] 面包屑导航
- [x] 常用 UI 展示
- [x] echarts 全屏展示
- [x] 登陆/注销功能
- [x] umi-request 封装
- [x] 简单权限管理

### 项目结构

```
├── public                   # 不参与编译的资源文件
├── src                      # 主程序目录
│   ├── assets                  # 资源文件
│   │   ├── font                    # 字体文件
│   │   └── images                  # 图片资源
|   |   └── utils                   # 通用工具和配置
│   ├── components              # 全局公共组件
│   │   ├── CustomBreadcrumb        # 面包屑导航
│   │   └── CustomMenu              # menu 菜单
|   |   └── RenderBuild             # 表单设计器
|   |   └── RenderForm             # 表单渲染
|   |   └── RenderTable            # table渲染
│   ├── contatiners             # 页面结构组件
│   ├── routes                  # 路由目录
│   ├── interface               # api 配置以及umi-request封装
│   ├── store                   # redux 配置
│   ├── style                   # 样式目录
│   ├── utils                   # 工具类
│   ├── views                   # UI 页面
|   |   ├── Login               # 登录
|   |   └── Index               # 首页
|   |   └── Apps               # 应用列表页
|   |   └── CreateAp           # 应用创建页面
│   ├── APP.js                  # App.js
│   └── index.js                # index.js
├── .prettierrc.js           # 代码规范
├── config-overrides.js      # antd 样式按需加载
├── .env.sit                 # antd 测试环境process.env配置
├── .env.dev                 # antd 本地开发环境process.env配置
├── .env.prod                # antd 生产环境process.env配置
```

### 使用方法

```npm
git clone

cd react-admin

// 安装依赖
yarn

// 启动
yarn start

// 打包
yarn build

```

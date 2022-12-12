import loadable from '@/utils/loadable'

const Index = loadable(() => import(/* webpackChunkName: 'index' */ '@/views/Index'))

// 通用
const CreateApp = loadable(() => import(/* webpackChunkName: 'CreateApp' */ '@/views/CreateApp'))
const Applications = loadable(() => import(/* webpackChunkName: 'Applications' */ '@/views/Apps/Applications'))

const About = loadable(() => import(/* webpackChunkName: 'about' */ '@/views/About'))

const routes = [
    { path: '/index', exact: true, name: 'Index', component: Index, auth: [1] },
    { path: '/createApp', exact: false, name: '创建应用', component: CreateApp, auth: [1] },
    { path: '/apps/applications', exact: false, name: '应用', component: Applications, auth: [1] },
    { path: '/about', exact: false, name: '关于', component: About, auth: [1] }
]

export default routes

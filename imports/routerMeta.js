export const routerMeta = {
  home: {
    path: '/',
    name: 'home',
    title: '首页',
    parent: '',
    params: [],
    breadcrumb: '',
    template: 'blogBrowse'
  },
  login: {
    path: '/login',
    name: 'signIn',
    title: '登录',
    parent: '',
    params: [],
    breadcrumb: '',
    template: 'AdminLogin'
  },
  register: {
    path: '/register',
    name: 'signUp',
    title: '注册',
    parent: '',
    params: [],
    breadcrumb: '',
    template: 'AdminRegister'
  },
  notFound: {
    path: '/not-found',
    name: 'notFound',
    title: '访问的页面不存在',
    parent: '',
    params: [],
    breadcrumb: '',
    template: 'Admin_notFound'
  },
  noPermission: {
    path: '/no-permission',
    name: 'noPermission',
    title: '访问的页面没有权限',
    parent: '',
    params: [],
    breadcrumb: '',
    template: 'Admin_noPermission'
  },

  blog: {
    path: '/blog/:userId/space',
    name: 'public.blog',
    title: '我的博客',
    parent: '',
    params: ['userId'],
    breadcrumb: '',
    template: 'AdminBlogList'
  },
  blogConfig: {
    path: '/blog/config',
    name: 'private.blog.config',
    title: '博客管理',
    parent: 'public.blog',
    params: [],
    breadcrumb: '',
    template: 'AdminBlogConfig'
  },

  articleCreate: {
    path: '/article/create',
    name: 'private.article.create',
    title: '创建博文',
    parent: 'public.blog',
    params: [],
    breadcrumb: '',
    template: 'AdminArticleCreate'
  },
  articleView: {
    path: '/article/:aid/view',
    name: 'public.blog.view',
    title: '博文详情',
    parent: 'public.blog',
    params: ['aid'],
    breadcrumb: '',
    template: 'AdminArticleView'
  },
  // 只有博主本人能访问
  articleEdit: {
    path: '/article/:aid/edit',
    name: 'private.article.edit',
    title: '博文修改',
    parent: 'public.blog',
    params: ['aid'],
    breadcrumb: '',
    template: 'AdminArticleEdit'
  },

  // todo
  accountInfo: {
    path: '/account/info',
    name: 'private.account.info',
    title: '我的主页',
    parent: '',
    params: [],
    breadcrumb: '',
    template: ''
  },
  accountNews: {
    path: '/account/news',
    name: 'private.account.news',
    title: '我的消息',
    parent: '',
    params: [],
    breadcrumb: '',
    template: ''
  },
  accountConfig: {
    path: '/account/config',
    name: 'private.account.config',
    title: '账户设置',
    parent: '',
    params: [],
    breadcrumb: '',
    template: ''
  },

  system: {
    path: '/system',
    name: 'private.system',
    title: '系统管理',
    parent: '',
    params: [],
    breadcrumb: '',
    template: 'AdminSystem'
  },
};

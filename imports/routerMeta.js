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
  // todo
  noPermission: {
    path: '/no-permission',
    name: 'noPermission',
    title: '访问的页面没有权限',
    parent: '',
    params: [],
    breadcrumb: '',
    template: ''
  },

  blog: {
    path: '/blog',
    name: 'admin.blog',
    title: '我的博客',
    parent: '',
    params: [],
    breadcrumb: '',
    template: 'AdminBlogList'
  },
  blogConfig: {
    path: '/blog/:userId/config',
    name: 'admin.blog.config',
    title: '博客管理',
    parent: 'admin.blog',
    params: ['userId'],
    breadcrumb: '',
    template: ''
  },

  articleCreate: {
    path: '/article/create',
    name: 'admin.article.create',
    title: '创建博文',
    parent: 'admin.blog',
    params: [],
    breadcrumb: '',
    template: 'AdminArticleCreate'
  },
  articleView: {
    path: '/article/:aid/view',
    name: 'article.view',
    title: '博文详情',
    parent: 'admin.blog',
    params: ['aid'],
    breadcrumb: '',
    template: 'AdminArticleView'
  },
  articleEdit: {
    path: '/article/:aid/edit',
    name: 'admin.article.edit',
    title: '博文修改',
    parent: 'admin.blog',
    params: ['aid'],
    breadcrumb: '',
    template: 'AdminArticleEdit'
  },

  // todo
  accountInfo: {
    path: '/account/info',
    name: 'admin.account.info',
    title: '我的主页',
    parent: '',
    params: [],
    breadcrumb: '',
    template: ''
  },
  accountNews: {
    path: '/account/news',
    name: 'admin.account.news',
    title: '我的消息',
    parent: '',
    params: [],
    breadcrumb: '',
    template: ''
  },
  accountConfig: {
    path: '/account/config',
    name: 'admin.account.config',
    title: '账户设置',
    parent: '',
    params: [],
    breadcrumb: '',
    template: ''
  },

  system: {
    path: '/admin/system',
    name: 'admin.system',
    title: '系统管理',
    parent: '',
    params: [],
    breadcrumb: '',
    template: 'AdminSystem'
  },
};

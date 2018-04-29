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
  blogCreate: {
    path: '/blog/create',
    name: 'admin.blog.create',
    title: '创建博文',
    parent: 'admin.blog',
    params: [],
    breadcrumb: '',
    template: 'AdminBlogCreate'
  },
  blogView: {
    path: '/blog/:bid/view',
    name: 'admin.blog.view',
    title: '博文详情',
    parent: 'admin.blog',
    params: ['bid'],
    breadcrumb: '',
    template: 'AdminBlogView'
  },
  blogConfig: {
    path: '/blog',
    name: 'admin.blog.config',
    title: '博客管理',
    parent: '',
    params: [],
    breadcrumb: '',
    template: ''
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

  // todo
  system: {
    path: '/admin/system',
    name: 'admin.system',
    title: '系统管理',
    parent: '',
    params: [],
    breadcrumb: '',
    template: ''
  },
  blogManage: {
    path: '/manage/blog',
    name: 'admin.manage.blog',
    title: '博文管理',
    parent: '',
    params: [],
    breadcrumb: '',
    template: 'AdminBlogManage'
  },
  userManage: {
    path: '/manage/user',
    name: 'admin.manage.user',
    title: '用户管理',
    parent: '',
    params: [],
    breadcrumb: '',
    template: 'AdminUserManage'
  },
};
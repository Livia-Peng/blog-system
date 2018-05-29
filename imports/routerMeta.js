export const routerMeta = {
  home: {
    path: '/',
    name: 'home',
    title: '首页',
    parent: '',
    params: [],
    breadcrumb: '',
    template: 'blogHome'
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
  userInfo: {
    path: '/user/:userId/info',
    name: 'private.user.info',
    title: '个人主页',
    parent: '',
    params: ['userId'],
    breadcrumb: '',
    template: 'AdminUserInfo'
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

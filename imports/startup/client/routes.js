/**
 * Created by livia on 2018/1/18.
 */
import {FlowRouter} from "meteor/kadira:flow-router"
import {BlazeLayout} from "meteor/kadira:blaze-layout"
import { Meteor } from 'meteor/meteor'
import {App} from '/imports/app.js'

import '/imports/ui/layouts/body/body.js'
import '/imports/ui/pages/browse/blogBrowse.js'

import '/imports/ui/pages/blog/blogList.js'
import '/imports/ui/pages/blog/blogView.js'
import '/imports/ui/pages/blog/blogCreate.js'

import '/imports/ui/pages/manage/blogManage.js'
import '/imports/ui/pages/manage/userManage.js'

import '/imports/ui/pages/account/login.js'
import '/imports/ui/pages/account/register.js'
import '/imports/ui/pages/notFound/notFound.js'

export const AdminPaths = {
  browse: {
    name: 'Admin.browse',
    title: '浏览',
    path: '/browse',
    template: 'AdminBlogBrowse',
    breadcrumb: {
      title: '浏览',
    },
    groups: [],
    roles: [],
    hasLeaf: false
  },
  blog: {
    name: 'Admin.blog',
    title: '主页',
    path: '/blog',
    template: 'AdminBlogList',
    breadcrumb: {
      title: '主页',
    },
    groups: [],
    roles: [],
    hasLeaf: true,
    leaf: {
      create: {
        name: 'Admin.blog.create',
        title: '创建博文',
        path: '/blog/create',
        template: 'AdminBlogCreate',
        breadcrumb: {
          title: '创建博文',
          parent: 'Admin.blog',
        },
        roles: [],
        groups: [],
        hasLeaf: false
      },
      view: {
        name: 'Admin.blog.view',
        title: '博文详情',
        path: '/blog/:viewId/view',
        template: 'AdminBlogView',
        breadcrumb: {
          title: '博文详情',
          parent: 'Admin.blog',
          params: ['viewId'],
        },
        roles: [],
        groups: [],
        fastRender: true,
        subscriptions: function (params, queryParams) {
        },
        hasLeaf: false
      }
    }
  },
  blogManage: {
    name: 'Admin.manage.blog',
    title: '博文管理',
    path: '/manage/blog',
    icon: 'fa  fa-home',
    template: 'AdminBlogManage',
    breadcrumb: {
      title: '博文管理',
    },
    groups: [],
    roles: [],
    hasLeaf: false
  },
  userManage: {
    name: 'Admin.manage.user',
    title: '用户管理',
    path: '/manage/user',
    icon: 'fa  fa-home',
    template: 'AdminUserManage',
    breadcrumb: {
      title: '用户管理',
    },
    groups: [],
    roles: [],
    hasLeaf: false
  }
};

export const adminRoutes = FlowRouter.group({});

let RouterUtil = {
  genAdminRouters: function (routerMeta) {
    for (let idx in routerMeta) {
      if (!routerMeta.hasOwnProperty(idx)) {
        return
      }
      // add router and template
      adminRoutes.route(routerMeta[idx].path, {
        name: routerMeta[idx].name,
        title: routerMeta[idx].title,
        parent: routerMeta[idx].parent,
        breadcrumb: routerMeta[idx].breadcrumb || {},
        roles: routerMeta[idx].roles,
        groups: routerMeta[idx].groups,
        fastRender: routerMeta[idx].fastRender,
        hasSidebar: routerMeta[idx].hasSidebar || false,
        hasMore: routerMeta[idx].hasMore || false,
        more: routerMeta[idx].more || {},
        action: function (params, queryParams) {
          DocHead.setTitle(routerMeta[idx].breadcrumb.title + " | " + App.config.siteTitle);
          BlazeLayout.render('Admin_body', {main: routerMeta[idx].template});
        },
        //register FlowRouter.subscriptions
        subscriptions: routerMeta[idx].subscriptions
      });
      // add router and template for leaf menu
      if (routerMeta[idx].hasLeaf) {
        RouterUtil.genAdminRouters(routerMeta[idx].leaf)
      }
    }
  }
};

RouterUtil.genAdminRouters(AdminPaths);

adminRoutes.route('/', {
  name: 'Admin.home',
  triggersEnter: [function () {
    if (Meteor.userId()) {
      FlowRouter.go("Admin.blog");
    } else {
      FlowRouter.go("Admin.browse");
    }
  }]
});

FlowRouter.route('/login', {
  name: 'Admin.login',
  action() {
    BlazeLayout.render('AdminLogin');
  }
});

FlowRouter.route('/register', {
  name: 'Admin.register',
  action() {
    BlazeLayout.render('AdminRegister');
  }
});

FlowRouter.route('/not-found', {
  name: 'Admin.notFound',
  action() {
    BlazeLayout.render('Admin_notFound');
  }
});

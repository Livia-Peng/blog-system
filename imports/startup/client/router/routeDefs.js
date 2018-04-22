/**
 * Created by livia on 2018/4/22.
 */
import {FlowRouter} from "meteor/kadira:flow-router";
import {BlazeLayout} from "meteor/kadira:blaze-layout";
import {App} from "/imports/app";
import {routerGen, subsFn as sf} from './routerUtils.js';
import {routerMeta as rtM} from '/imports/routerMeta.js';

import '/imports/ui/layouts/body/AdminBody.js'

import '/imports/ui/pages/blog/blogList.js'
import '/imports/ui/pages/blog/blogView.js'
import '/imports/ui/pages/blog/blogCreate.js'

import '/imports/ui/pages/manage/blogManage.js'
import '/imports/ui/pages/manage/userManage.js'

const mainDefs = [
  // blog
  {
    path: rtM.blog.path,
    name: rtM.blog.name,
    title: rtM.blog.title,
    breadcrumb: {
      title: rtM.blog.title,
      parent: rtM.blog.parent,
      params: rtM.blog.params
    },
    subs: function (params, queryParams) {
      sf.blogAll(this, params, queryParams, {});
    },
    action: function () {
      DocHead.setTitle(`${rtM.blog.title} | ${App.config.siteTitle}`);
      BlazeLayout.render('Admin_body', {
        bc: rtM.blog.breadcrumb,
        main: rtM.blog.template,
      });
    }
  },
  {
    path: rtM.blogCreate.path,
    name: rtM.blogCreate.name,
    title: rtM.blogCreate.title,
    breadcrumb: {
      title: rtM.blogCreate.title,
      parent: rtM.blogCreate.parent,
      params: rtM.blogCreate.params
    },
    action: function () {
      DocHead.setTitle(`${rtM.blogCreate.title} | ${App.config.siteTitle}`);
      BlazeLayout.render('Admin_body', {
        bc: rtM.blogCreate.breadcrumb,
        main: rtM.blogCreate.template,
      });
    },
  },
  {
    path: rtM.blogView.path,
    name: rtM.blogView.name,
    title: rtM.blogView.title,
    breadcrumb: {
      title: rtM.blogView.title,
      parent: rtM.blogView.parent,
      params: rtM.blogView.params
    },
    subs: function (params, queryParams) {
      sf.blogById(this, params, queryParams)
    },
    action: function () {
      DocHead.setTitle(`${rtM.blogView.title} | ${App.config.siteTitle}`);
      BlazeLayout.render('Admin_body', {
        bc: rtM.blogView.breadcrumb,
        main: rtM.blogView.template,
      });
    },
  },
  // manager
  {
    path: rtM.blogManage.path,
    name: rtM.blogManage.name,
    title: rtM.blogManage.title,
    breadcrumb: {
      title: rtM.blogManage.title,
      parent: rtM.blogManage.parent,
      params: rtM.blogManage.params
    },
    action: function () {
      DocHead.setTitle(`${rtM.blogManage.title} | ${App.config.siteTitle}`);
      BlazeLayout.render('Admin_body', {
        bc: rtM.blogManage.breadcrumb,
        main: rtM.blogManage.template,
      });
    }
  },
  {
    path: rtM.userManage.path,
    name: rtM.userManage.name,
    title: rtM.userManage.title,
    breadcrumb: {
      title: rtM.userManage.title,
      parent: rtM.userManage.parent,
      params: rtM.userManage.params
    },
    action: function () {
      DocHead.setTitle(`${rtM.userManage.title} | ${App.config.siteTitle}`);
      BlazeLayout.render('Admin_body', {
        bc: rtM.userManage.breadcrumb,
        main: rtM.userManage.template,
      });
    }
  },
];

routerGen(FlowRouter, mainDefs);

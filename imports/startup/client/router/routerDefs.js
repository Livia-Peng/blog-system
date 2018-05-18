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
import '/imports/ui/pages/blog/blogConfig.js'
import '/imports/ui/pages/article/articleView.js'
import '/imports/ui/pages/article/articleCreate.js'
import '/imports/ui/pages/article/articleEdit.js'

import '/imports/ui/pages/manage/system.js'


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
    action: function () {
      DocHead.setTitle(`${rtM.blog.title} | ${App.config.siteTitle}`);
      BlazeLayout.render('Admin_body', {
        bc: rtM.blog.breadcrumb,
        main: rtM.blog.template,
      });
    }
  },
  {
    path: rtM.blogConfig.path,
    name: rtM.blogConfig.name,
    title: rtM.blogConfig.title,
    breadcrumb: {
      title: rtM.blogConfig.title,
      parent: rtM.blogConfig.parent,
      params: rtM.blogConfig.params
    },
    action: function () {
      DocHead.setTitle(`${rtM.blogConfig.title} | ${App.config.siteTitle}`);
      BlazeLayout.render('Admin_body', {
        bc: rtM.blogConfig.breadcrumb,
        main: rtM.blogConfig.template,
      });
    }
  },
  // article
  {
    path: rtM.articleCreate.path,
    name: rtM.articleCreate.name,
    title: rtM.articleCreate.title,
    breadcrumb: {
      title: rtM.articleCreate.title,
      parent: rtM.articleCreate.parent,
      params: rtM.articleCreate.params
    },
    action: function () {
      DocHead.setTitle(`${rtM.articleCreate.title} | ${App.config.siteTitle}`);
      BlazeLayout.render('Admin_body', {
        bc: rtM.articleCreate.breadcrumb,
        main: rtM.articleCreate.template,
      });
    },
  },
  {
    path: rtM.articleView.path,
    name: rtM.articleView.name,
    title: rtM.articleView.title,
    breadcrumb: {
      title: rtM.articleView.title,
      parent: rtM.articleView.parent,
      params: rtM.articleView.params
    },
    subs: function (params, queryParams) {
      sf.articleById(this, params, queryParams)
    },
    action: function () {
      DocHead.setTitle(`${rtM.articleView.title} | ${App.config.siteTitle}`);
      BlazeLayout.render('Admin_body', {
        bc: rtM.articleView.breadcrumb,
        main: rtM.articleView.template,
      });
    },
  },
  {
    path: rtM.articleEdit.path,
    name: rtM.articleEdit.name,
    title: rtM.articleEdit.title,
    breadcrumb: {
      title: rtM.articleEdit.title,
      parent: rtM.articleEdit.parent,
      params: rtM.articleEdit.params
    },
    subs: function (params, queryParams) {
      sf.articleById(this, params, queryParams)
    },
    action: function () {
      DocHead.setTitle(`${rtM.articleEdit.title} | ${App.config.siteTitle}`);
      BlazeLayout.render('Admin_body', {
        bc: rtM.articleEdit.breadcrumb,
        main: rtM.articleEdit.template,
      });
    },
  },
  // account
  {
    path: rtM.accountInfo.path,
    name: rtM.accountInfo.name,
    title: rtM.accountInfo.title,
    breadcrumb: {
      title: rtM.accountInfo.title,
      parent: rtM.accountInfo.parent,
      params: rtM.accountInfo.params
    },
    action: function () {
      DocHead.setTitle(`${rtM.accountInfo.title} | ${App.config.siteTitle}`);
      BlazeLayout.render('Admin_body', {
        bc: rtM.accountInfo.breadcrumb,
        main: rtM.accountInfo.template,
      });
    },
  },
  // system
  {
    path: rtM.system.path,
    name: rtM.system.name,
    title: rtM.system.title,
    breadcrumb: {
      title: rtM.system.title,
      parent: rtM.system.parent,
      params: rtM.system.params
    },
    action: function () {
      DocHead.setTitle(`${rtM.system.title} | ${App.config.siteTitle}`);
      BlazeLayout.render('Admin_body', {
        bc: rtM.system.breadcrumb,
        main: rtM.system.template,
      });
    }
  },
];

routerGen(FlowRouter, mainDefs);

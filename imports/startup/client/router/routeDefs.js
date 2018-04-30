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
import '/imports/ui/pages/blog/blogEdit.js'

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
  {
    path: rtM.blogEdit.path,
    name: rtM.blogEdit.name,
    title: rtM.blogEdit.title,
    breadcrumb: {
      title: rtM.blogEdit.title,
      parent: rtM.blogEdit.parent,
      params: rtM.blogEdit.params
    },
    subs: function (params, queryParams) {
      sf.blogById(this, params, queryParams)
    },
    action: function () {
      DocHead.setTitle(`${rtM.blogEdit.title} | ${App.config.siteTitle}`);
      BlazeLayout.render('Admin_body', {
        bc: rtM.blogEdit.breadcrumb,
        main: rtM.blogEdit.template,
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

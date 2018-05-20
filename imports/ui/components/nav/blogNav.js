/**
 * Created by livia on 2018/5/12.
 */
import './blogNav.html'
import {Meteor} from 'meteor/meteor'
import {Template} from 'meteor/templating'
import {FlowRouter} from "meteor/kadira:flow-router"
import {routerMeta} from "/imports/routerMeta.js"

Template.blogNav.helpers({
  menu: function () {
    FlowRouter.watchPathChange();
    const routeName = FlowRouter.current().route.name;
    const userId = Meteor.userId();
    return [
      {
        active: routeName.indexOf(routerMeta.home.name) === 0 ? 'active' : '',
        url: '/',
        title: '首页'
      },
      {
        active: routeName.indexOf(routerMeta.blog.name) === 0 ? 'active' : '',
        url: FlowRouter.path(routerMeta.blog.name, {userId: userId}),
        title: '个人博客'
      },
      {
        url: FlowRouter.path(routerMeta.articleCreate.name),
        title: '新文章'
      },
      {
        url: FlowRouter.path(routerMeta.blogConfig.name),
        title: '博客管理'
      },
    ]
  },
});

Template.blogNav.onCreated(function () {
});

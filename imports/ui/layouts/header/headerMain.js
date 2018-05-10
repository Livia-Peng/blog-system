/**
 * Created by livia on 2018/1/18.
 */
import './headerMain.html'
import {Meteor} from "meteor/meteor"
import {Template} from 'meteor/templating'
import {App} from "/imports/app.js"
import {FlowRouter} from "meteor/kadira:flow-router"
import {routerMeta} from "/imports/routerMeta"

Template.headerMain.helpers({
  user: function () {
    const user = Meteor.user();
    if (user && user.profile) {
      return {
        // username: user.username,
        id: user._id,
        name: user.profile.name,
        isSuper: user.profile.isSuper
      }
    }
  },
  menu: function () {
    FlowRouter.watchPathChange();
    const routeName = FlowRouter.current().route.name;
    return [
      {
        active: routeName.indexOf(routerMeta.blog.name) === 0 ? 'active' : '',
        url: FlowRouter.path(routerMeta.blog.name),
        title: '博文'
      },
      {
        active: routeName.indexOf(routerMeta.userManage.name) === 0 ? 'active' : '',
        url: FlowRouter.path(routerMeta.userManage.name),
        title: '用户管理'
      }
    ]
  },
});

Template.headerMain.onCreated(function () {
});

Template.headerMain.onRendered(function () {
});

Template.headerMain.events({
  "click a[href='/logout']": function (event) {
    event.preventDefault();
    UIBlock.block('登出中...');
    Meteor.logout(function (err) {
      UIBlock.unblock();
      if (err) {
        console.log(err);
      } else {
        FlowRouter.go(routerMeta.login.name)
      }
    })
  },
});

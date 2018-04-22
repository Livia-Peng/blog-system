/**
 * Created by livia on 2018/1/18.
 */
import {FlowRouter} from "meteor/kadira:flow-router"
import {BlazeLayout} from "meteor/kadira:blaze-layout"
import {Meteor} from 'meteor/meteor'
import {routerMeta as rtM} from '/imports/routerMeta.js'
import {App} from '/imports/app.js'

import '/imports/ui/layouts/body/AdminBody.js'
import '/imports/ui/pages/browse/blogBrowse.js'
import '/imports/ui/pages/account/login.js'
import '/imports/ui/pages/account/register.js'
import '/imports/ui/pages/notFound/notFound.js'

import './router/routeDefs.js'

FlowRouter.route('/', {
  name: 'admin.home',
  triggersEnter: [function () {
    if (Meteor.userId()) {
      FlowRouter.go(rtM.blog.path);
    } else {
      FlowRouter.go(rtM.browse.path);
    }
  }]
});

FlowRouter.route(rtM.login.path, {
  name: rtM.login.name,
  action() {
    DocHead.setTitle(`${rtM.login.title} | ${App.config.siteTitle}`);
    BlazeLayout.render(rtM.login.template);
  }
});

FlowRouter.route(rtM.register.path, {
  name: rtM.register.name,
  action() {
    DocHead.setTitle(`${rtM.register.title} | ${App.config.siteTitle}`);
    BlazeLayout.render(rtM.register.template);
  }
});

FlowRouter.route(rtM.notFound.path, {
  name: rtM.notFound.name,
  action() {
    DocHead.setTitle(`${rtM.notFound.title} | ${App.config.siteTitle}`);
    BlazeLayout.render(rtM.notFound.template);
  }
});

FlowRouter.route(rtM.browse.path, {
  name: rtM.browse.name,
  action() {
    DocHead.setTitle(`${rtM.notFound.title} | ${App.config.siteTitle}`);
    BlazeLayout.render('Admin_body', {
      main: rtM.browse.template,
    });
  }
});

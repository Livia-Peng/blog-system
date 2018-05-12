/**
 * Created by livia on 2018/1/18.
 */
import {FlowRouter} from "meteor/kadira:flow-router"
import {BlazeLayout} from "meteor/kadira:blaze-layout"
import {Meteor} from 'meteor/meteor'
import {routerMeta as rtM} from '/imports/routerMeta.js'
import {App} from '/imports/app.js'

import '/imports/ui/layouts/body/AdminBody.js'
import '/imports/ui/pages/home/blogHome'
import '/imports/ui/pages/account/login.js'
import '/imports/ui/pages/account/register.js'
import '/imports/ui/pages/notFound/notFound.js'
import '/imports/ui/pages/noPermission/noPermission.js'

import './router/routerDefs.js'

FlowRouter.route('/', {
  name: rtM.home.name,
  action() {
    DocHead.setTitle(`${rtM.home.title} | ${App.config.siteTitle}`);
    BlazeLayout.render('Admin_body', {
      main: rtM.home.template,
    });
  }
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

FlowRouter.route(rtM.noPermission.path, {
  name: rtM.noPermission.name,
  action() {
    DocHead.setTitle(`${rtM.noPermission.title} | ${App.config.siteTitle}`);
    BlazeLayout.render(rtM.noPermission.template);
  }
});

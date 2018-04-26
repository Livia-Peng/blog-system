/**
 * Created by livia on 2018/1/16.
 */
import {Meteor} from "meteor/meteor";
import {Accounts} from "meteor/accounts-base";
import {FlowRouter} from "meteor/kadira:flow-router"
import {routerMeta} from '/imports/routerMeta.js'

import './plugins.js'
import './routes.js'
import './customizedHelpers.js'

Meteor.subscribe('images');

if (Meteor.isClient) {
  Accounts.onLogout(() => {
    console.log('user logout');
    Meteor.defer(() => {
      FlowRouter.go(routerMeta.login.name);
    });
  });
}

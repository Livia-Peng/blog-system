/**
 * Created by livia on 2018/4/15.
 */
import {Meteor} from "meteor/meteor"
import {App} from '/imports/app.js'

export const checkIsLogin = function () {
  if (!Meteor.user()) {
    Logger.error('xxxxxxxxxxxxxxx 未登录！xxxxxxxxxxxxxxx');
    throw new Meteor.Error('未登录')
  }
};

export const handleCatchErr = function (err) {
  if (err.errorType && err.errorType === 'Meteor.Error') {
    throw err
  } else {
    throw App.err.server.dbWriteErr
  }
};

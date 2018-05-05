/**
 * Created by livia on 2018/5/5.
 */
import {Meteor} from 'meteor/meteor'
import {checkIsLogin} from '/imports/app/server/utils.js'

Meteor.publish('account_bySelector', function (selector, fields = {}) {
  Logger.info('########## Publish account_bySelector ', {
    selector: selector,
    fields: fields
  }, Meteor.user());

  checkIsLogin();

  return Meteor.users.find(selector, {fields: fields})
});

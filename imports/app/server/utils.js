/**
 * Created by livia on 2018/4/15.
 */
import {Meteor} from "meteor/meteor"

export const checkIsLoggin = function () {
  if (!Meteor.user()) {
    Logger.error('xxxxxxxxxxxxxxx 未登录！xxxxxxxxxxxxxxx');
    throw new Meteor.Error('未登录')
  }
};

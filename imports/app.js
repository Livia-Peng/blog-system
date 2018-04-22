/**
 * Created by livia on 2018/1/18.
 */
import {Meteor} from "meteor/meteor"

export const App = {};

App.config = {
  siteTitle: '个人博客系统',
  format: {
    datetime: "YYYY-MM-DD HH:mm",
    datetimeLog: "YYYY-MM-DD HH:mm:ss SSS"
  }
};

App.strings = {
  unknown: 'unknown',
  noRecord: '无',
  telReg: /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/, // 手机号码正则匹配式
  idReg: /^[A-Za-z0-9]{17}$/, //id正则匹配
  firstOption: '- 请选择 -',
};

App.selector = {
  unDeleted: {
    $or: [
      {isDeleted: false},
      {isDeleted: {$exists: false}}
    ]
  },
  defaultFields: {
    lastUpdatedBy: 1,
    lastUpdatedAt: 1,
    createdBy: 1,
    createdAt: 1,
    isDeleted: 1
  },
  unPublished: {
    $or: [
      {isPublished: false},
      {isPublished: {$exists: false}}
    ]
  },
};

App.err = {};

if (Meteor.isServer) {
  App.env = {
    isDebug: !!process.env.isDebug || false,
  };

  App.config.server = {
    superAdmin: {
      username: "admin",
      password: "superAdmin",
      name: "超级管理员",
      tel: "17612739581",
    }
  };

  App.err.server = {}
}

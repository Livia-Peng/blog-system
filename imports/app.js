/**
 * Created by livia on 2018/1/18.
 */
import {Meteor} from "meteor/meteor"

export const App = {};

App.config = {
  siteTitle: '个人博客',
  format: {
    datetimeLog: "YYYY-MM-DD HH:mm:ss SSS"
  }
};

App.strings = {};

App.err = {};

if (Meteor.isServer) {
  App.config.server = {
    superAdmin: {
      username: "admin",
      password: "superAdmin",
      name: "超级管理员",
      tel: "17612739581",
    }
  }
}
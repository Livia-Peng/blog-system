/**
 * Created by livia on 2018/1/21.
 */
import {Meteor} from "meteor/meteor";
import SimpleSchema from "simpl-schema";
import {Tracker} from "meteor/tracker";
import {App} from "./app.js";
import cnMessages from "/imports/startup/both/SchemaMessages.cn.js";

// add buffer to client for simple-schema setDefaultMessages
// ('meteor 1.5 remove buffer at client, see https://github.com/meteor/meteor/issues/8645)
Meteor.isClient && (window.Buffer = require('buffer').Buffer);

export const sSchema = SimpleSchema;
sSchema.setDefaultMessages(cnMessages);

sSchema.extendOptions(['autoform']);

export const BasicSchema = new sSchema({
  createdAt: {
    type: Date,
    label: '创建时间',
    optional: true,
    autoValue: function() {
      if (Meteor.isServer && this.isInsert) {
        return this.isSet ? this.value : new Date();
      } else {
        this.unset();
      }
    },
  },
  createdBy: {
    type: String,
    label: '创建人',
    optional: true,
    autoValue: function () {
      if (Meteor.isServer && this.value) {
        return this.value
      }
      let userId = App.strings.unknown;
      try {
        userId = Meteor.userId() || userId;
      } catch (err) {
        if (Meteor.isServer) Logger.warn('createdBy: user is null');
      }
      if (this.isInsert) {
        return userId;
      } else {
        this.unset();  // Prevent user from supplying their own value
      }
    }
  },
  lastUpdatedAt: {
    type: Date,
    label: '更新时间',
    optional: true,
    autoValue: function() {
      if (Meteor.isServer) {
        return this.isSet ? this.value : new Date();
      } else {
        this.unset();
      }
    },
  },
  lastUpdatedBy: {
    type: String,
    label: '更新人',
    optional: true,
    autoValue: function () {
      if (Meteor.isServer && this.value) {
        return this.value
      }
      let userId = App.strings.unknown;
      try {
        userId = Meteor.userId() || userId;
      } catch (err) {
        if (Meteor.isServer) Logger.warn('lastUpdatedBy: user is null');
      }
      return userId
    }
  },
  isDeleted: {
    type: Boolean,
    index: 1,
    label: "已被删除",
    optional: true
  }
}, {tracker: Tracker});

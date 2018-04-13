/**
 * Created by livia on 2018/1/21.
 */
import SimpleSchema from "simpl-schema";
import {Tracker} from "meteor/tracker";
// import {App} from "./app.js";
import cnMessages from "/imports/startup/both/SchemaMessages.cn.js";
Meteor.isClient && (window.Buffer = require('buffer').Buffer);

export const sSchema = SimpleSchema;
sSchema.setDefaultMessages(cnMessages);

export const BasicSchema = new SimpleSchema({
  createdAt: {
    type: Date,
    optional: true,
    autoValue: function() {
      if (this.isInsert) {
        return this.isSet ? this.value : new Date();
      }else{
        this.unset();
      }
    },
  }
}, {tracker: Tracker});

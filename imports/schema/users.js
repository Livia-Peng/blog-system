/**
 * Created by livia on 2018/1/21.
 */
import {Meteor} from "meteor/meteor";
import {sSchema} from "../sharedSchemas";
import {Tracker} from "meteor/tracker";
// import {App} from '/imports/app';

export const user = new sSchema({
  username: {
    type: String,
    unique: true
  },
  // Make sure this services field is in your schema if you're using any of the accounts packages
  services: {
    type: Object,
    optional: true,
    blackbox: true
  },
  // todo: 使用邮箱登录 ===========================================
  emails: {
    type: Array,
    // For accounts-password, either emails or username is required, but not both. It is OK to make this
    // optional here because the accounts-password package does its own validation.
    // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
    optional: true
  },
  "emails.$": {
    type: Object
  },
  "emails.$.address": {
    type: String,
    regEx: sSchema.RegEx.Email
  },
  "emails.$.verified": {
    type: Boolean
  },
  // Use this registered_emails field if you are using splendido:meteor-accounts-emails-field
  // splendido:meteor-accounts-meld
  registered_emails: {
    type: Array,
    optional: true
  },
  'registered_emails.$': {
    type: Object,
    blackbox: true
  },
  // ============================================================
  profile: {
    type: Object,
    optional: true
  },
  'profile.name': {
    type: String,
    unique: true
  },
  'profile.email': {
    type: String,
    optional: true
  },
  'profile.tel': {
    type: String,
    optional: true
  },
  createdAt: {
    type: Date,
    autoValue: function () {
      if (Meteor.isServer) {
        return this.isSet ? this.value : new Date()
      }
    }
  },
}, {tracker: Tracker});

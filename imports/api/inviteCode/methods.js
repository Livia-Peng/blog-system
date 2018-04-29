/**
 * Created by livia on 2018/4/29.
 */
import {Meteor} from "meteor/meteor"
import {App} from "/imports/app.js"
import {InviteCode} from './inviteCode.js'

Meteor.methods({
  inviteCode_create (insertDoc) {
    Logger.info('########## Methods inviteCode_create insertDoc:', insertDoc);

    const inviteCodeDoc = InviteCode.findOne({code: insertDoc.inviteCode})
  },
});

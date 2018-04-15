/**
 * Created by livia on 2018/1/21.
 */
import {Meteor} from "meteor/meteor"
import {check} from "meteor/check"
import {Blog} from "./blog.js"
import {App} from "/imports/app.js"
import {checkIsLoggin} from '/imports/app/server/utils.js'

Meteor.methods({
  blog_insert (insertDoc) {
    Logger.info('########## Method blog_insert insertDoc: ', insertDoc, Meteor.user());
    checkIsLoggin();
  },

  blog_update (blogId, updateDoc) {
    Logger.info('########## Method blog_update:', {
      blogId: blogId, updateDoc: updateDoc, user: Meteor.user()
    });
    checkIsLoggin();
  },

  blog_delete (blogId) {
    Logger.info('########## Method blog_delete:', {blogId: blogId, user: Meteor.user()});
    checkIsLoggin();
  },
});

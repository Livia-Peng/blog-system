/**
 * Created by livia on 2018/1/21.
 */
import {Meteor} from "meteor/meteor"
import {Blog} from "./blog.js"
import {App} from "/imports/app.js"
import {checkIsLogin, handleCatchErr} from '/imports/app/server/utils.js'
import {Schemas} from '/imports/schemas.js'

Meteor.methods({
  blog_insert (insertDoc) {
    Logger.info('########## Methods blog_insert insertDoc: ', insertDoc, Meteor.user());
    checkIsLogin();
    try {
      Schemas.blog.validate(insertDoc)
    } catch (err) {
      Logger.debug('blog_insert schema validate err:', err, {});
      let errStr = '';
      if (err.details && _.isArray(err.details)) {
        err.details.forEach(error => {
          errStr += error.message + '；'
        });
      } else {
        errStr = App.err.server.whatFormatErr('数据')
      }
      throw new Meteor.Error(errStr)
    }
    try {
      const blogId = Blog.insert(insertDoc);
      Logger.info('**** > Methods blog_insert success, id: ', blogId);
      return blogId
    } catch (err) {
      Logger.error('blog_insert error:', err, {});
      handleCatchErr(err)
    }
  },

  blog_update (blogId, updateDoc) {
    Logger.info('########## Method blog_update:', {
      blogId: blogId, updateDoc: updateDoc, user: Meteor.user()
    });
    checkIsLogin();
  },

  blog_delete (blogId) {
    Logger.info('########## Method blog_delete:', {blogId: blogId, user: Meteor.user()});
    checkIsLogin();
  },
});

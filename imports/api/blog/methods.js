/**
 * Created by livia on 2018/1/21.
 */
import {Meteor} from "meteor/meteor"
import {Blog} from "./blog.js"
import {App} from "/imports/app.js"
import {checkIsLogin, handleCatchErr, getChangedDoc, schemaValidate} from '/imports/app/server/utils.js'
import {Schemas} from '/imports/schemas.js'

Meteor.methods({
  blog_insert (insertDoc) {
    Logger.info('########## Methods blog_insert insertDoc: ', insertDoc, Meteor.user());
    checkIsLogin();
    schemaValidate(Schemas.blog, insertDoc, 'blog_insert');
    try {
      const blogId = Blog.insert(insertDoc);
      Logger.info('**** > Methods blog_insert success, id: ', blogId);
      return blogId
    } catch (err) {
      Logger.error('**** > Methods blog_insert error:', err, {});
      handleCatchErr(err)
    }
  },

  blog_update (blogId, updateDoc) {
    Logger.info('########## Methods blog_update:', {
      blogId: blogId, updateDoc: updateDoc, user: Meteor.user()
    });
    checkIsLogin();
    const blogCurDoc = Blog.findOne({$and: [{_id: blogId}, App.selector.unDeleted]});
    if (!blogCurDoc) {
      throw App.err.server.whatNotExist(App.strings.collection.blog)
    }
    const changedDoc = getChangedDoc(updateDoc, blogCurDoc);
    if (_.isEmpty(changedDoc)) {
      Logger.debug('blog 并无更新，直接返回');
      return true
    }
    schemaValidate(Schemas.blog, _.extend({}, blogCurDoc, changedDoc), 'blog_update');
    try {
      const result = Blog.update({_id: blogId}, {$set: changedDoc});
      Logger.info('**** > Methods blog_update success, result: ', result);
      return result
    } catch (err) {
      Logger.error('**** > Methods blog_update error:', err, {});
      handleCatchErr(err)
    }
  },

  blog_delete (blogId) {
    Logger.info('########## Methods blog_delete:', {blogId: blogId, user: Meteor.user()});
    checkIsLogin();
    const blogCurDoc = Blog.findOne({_id: blogId});
    if (!blogCurDoc) {
      throw App.err.server.whatNotExist(App.strings.collection.blog)
    } else if (blogCurDoc.isDeleted) {
      throw App.err.server.dupOperateErr('删除')
    }
    try {
      const result = Blog.update({_id: blogId}, {
        $set: {
          name: blogCurDoc + '（删）',
          isDeleted: true
        }
      });
      Logger.info('**** > Methods blog_delete success, result: ', result);
      return result
    } catch (err) {
      Logger.error('**** > Methods blog_delete error:', err, {});
      handleCatchErr(err)
    }
  },
});

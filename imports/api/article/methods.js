/**
 * Created by livia on 2018/1/21.
 */
import {Meteor} from "meteor/meteor"
import {Article} from "./article.js"
import {App} from "/imports/app.js"
import {checkIsLogin, handleCatchErr, getChangedDoc, schemaValidate} from '/imports/app/server/utils.js'
import {Schemas} from '/imports/schemas.js'

Meteor.methods({
  article_insert (insertDoc) {
    Logger.info('########## Methods article_insert insertDoc: ', insertDoc, Meteor.user());
    checkIsLogin();
    schemaValidate(Schemas.article, insertDoc, 'article_insert');
    try {
      const articleId = Article.insert(insertDoc);
      Logger.info('**** > Methods article_insert success, id: ', articleId);
      return articleId
    } catch (err) {
      Logger.error('**** > Methods article_insert error:', err, {});
      handleCatchErr(err)
    }
  },

  article_update (articleId, updateDoc) {
    Logger.info('########## Methods article_update:', {
      articleId: articleId, updateDoc: updateDoc, user: Meteor.user()
    });
    checkIsLogin();
    const articleCurDoc = Article.findOne({$and: [{_id: articleId}, App.selector.unDeleted]});
    if (!articleCurDoc) {
      throw App.err.server.whatNotExist(App.strings.collection.article)
    }
    const changedDoc = getChangedDoc(updateDoc, articleCurDoc);
    if (_.isEmpty(changedDoc)) {
      Logger.debug('article 并无更新，直接返回');
      return true
    }
    schemaValidate(Schemas.article, _.extend({}, articleCurDoc, changedDoc), 'article_update');
    try {
      const result = Article.update({_id: articleId}, {$set: changedDoc});
      Logger.info('**** > Methods article_update success, result: ', result);
      return result
    } catch (err) {
      Logger.error('**** > Methods article_update error:', err, {});
      handleCatchErr(err)
    }
  },

  article_delete (articleId) {
    Logger.info('########## Methods article_delete:', {articleId: articleId, user: Meteor.user()});
    checkIsLogin();
    const articleCurDoc = Article.findOne({_id: articleId});
    if (!articleCurDoc) {
      throw App.err.server.whatNotExist(App.strings.collection.article)
    } else if (articleCurDoc.isDeleted) {
      throw App.err.server.dupOperateErr('删除')
    }
    try {
      const result = Article.update({_id: articleId}, {
        $set: {
          name: articleCurDoc + '（删）',
          isDeleted: true
        }
      });
      Logger.info('**** > Methods article_delete success, result: ', result);
      return result
    } catch (err) {
      Logger.error('**** > Methods article_delete error:', err, {});
      handleCatchErr(err)
    }
  },
});

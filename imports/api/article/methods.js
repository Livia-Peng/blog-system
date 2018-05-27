/**
 * Created by livia on 2018/1/21.
 */
import {Meteor} from "meteor/meteor"
import {Article} from "./article.js"
import {ArticleDynamics} from '../articleDynamics/articleDynamics.js'
import {Comment} from '../comment/comment.js'
import {App} from "/imports/app.js"
import {checkIsLogin, handleCatchErr, getChangedDoc, schemaValidate} from '/imports/app/server/utils.js'
import {Schemas} from '/imports/schemas.js'
import {createArticleDynamics} from '/imports/api/articleDynamics/methods.js'

Meteor.methods({
  article_insert (insertDoc) {
    Logger.info('########## Methods article_insert insertDoc: ', insertDoc, Meteor.user());
    checkIsLogin();
    schemaValidate(Schemas.article, insertDoc, 'article_insert');
    try {
      const articleId = Article.insert(insertDoc);
      Logger.info('**** > Methods article_insert success, id: ', articleId);
      const articleDynamicId = createArticleDynamics(articleId);
      Logger.info('**** > Methods article_insert createArticleDynamics success, id: ', articleDynamicId);

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
    const validateDoc = _.extend({}, articleCurDoc, changedDoc);
    delete validateDoc._id;
    schemaValidate(Schemas.article, validateDoc, 'article_update');
    try {
      const result = Article.update({_id: articleId}, {$set: changedDoc});
      Logger.info('**** > Methods article_update success, result: ', result);

      if (!ArticleDynamics.findOne({articleId: articleId})) {
        createArticleDynamics(articleId)
      }

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

  articleList_api(selector = {}, pageNum = 1, pageSize = 5) {
    Logger.info('########## Methods articleList_api arguments: ', arguments, Meteor.user());
    const articleArr = Article.find({$and: [selector, App.selector.unDeleted]},
      {sort: {createdAt: -1}}).fetch();

    const groupArticleDoc = _.groupBy(articleArr, (item, index) => {
      return Math.floor(index / pageSize);
    });
    Logger.debug('articleArr.length:', articleArr.length, {});
    Logger.debug('totalPages:', _.keys(groupArticleDoc).length, {});
    Logger.debug('groupArticle keys:', _.keys(groupArticleDoc));
    if (!groupArticleDoc.hasOwnProperty(pageNum - 1)) {
      return 0
    }
    const articleList = groupArticleDoc[pageNum - 1];

    let resultArr = [];
    articleList.forEach(articleDoc => {
      const articleDynDoc = ArticleDynamics.findOne({articleId: articleDoc._id});
      const createdUser = Meteor.users.findOne({_id: articleDoc.createdBy});
      if (createdUser && articleDynDoc) {
        resultArr.push({
          _id: articleDoc._id,
          name: articleDoc.name,
          abstract: articleDoc.abstract,
          content: articleDoc.content,
          category: articleDoc.category,
          allowComment: articleDoc.allowComment,
          createdAt: moment(articleDoc.createdAt).format(App.config.format.datetime),
          praiseCount: articleDynDoc.praises && articleDynDoc.praises.length ? articleDynDoc.praises.length : 0,
          storedCount: articleDynDoc.stores && articleDynDoc.stores.length ? articleDynDoc.stores.length : 0,
          commentCount: articleDynDoc.commentCount || 0,
          authorId: createdUser._id,
          authorName: createdUser.profile.name,
        })
      } else {
        articleDoc.createdAt = moment(articleDoc.createdAt).format(App.config.format.datetime);
        resultArr.push(articleDoc)
      }
    });
    return {
      blogList: resultArr,
      totalLength: articleArr.length,
      totalPages: _.keys(groupArticleDoc).length,
      pageNum: pageNum
    }
  },

  categoryList_api(selector) {
    Logger.info('########## Methods categoryList_api arguments: ', arguments, Meteor.user());
    const articleArr = Article.find({$and: [selector, App.selector.unDeleted]}).fetch();
  }
});

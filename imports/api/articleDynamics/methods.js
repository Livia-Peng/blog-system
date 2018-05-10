/**
 * Created by livia on 2018/5/6.
 */
import {Meteor} from "meteor/meteor"
import {ArticleDynamics} from './articleDynamics.js'
import {checkIsLogin} from '/imports/app/server/utils.js'
import {App} from '/imports/app.js'

Meteor.methods({
  // dynamicKey: skinCount/praiseCount/storedCount
  articleDynamic_count(articleId, dynamicKey) {
    Logger.info('########## Methods articleDynamic_count: ', arguments, Meteor.user());
    checkIsLogin();
    const articleDynCur = ArticleDynamics.findOne({$and: [{articleId: articleId}, App.selector.unDeleted]});
    if (!articleDynCur) {
      Logger.error('**** > Methods articleDynamic_count 文章不存在, articleId:', articleId);
      return
    }
    const dynamicCount = articleDynCur[dynamicKey] ? articleDynCur[dynamicKey] ++ : 1;
    ArticleDynamics.update({_id: articleDynCur._id}, {$set: {[dynamicKey]: dynamicCount}})
  },

  articleDynamic_comments(articleId, commentInfo) {
    Logger.info('########## Methods articleDynamic_comments: ', arguments, Meteor.user());
    checkIsLogin();
    const articleDynCur = ArticleDynamics.findOne({$and: [{articleId: articleId}, App.selector.unDeleted]});
    if (!articleDynCur) {
      Logger.error('**** > Methods articleDynamic_comments 文章不存在, articleId:', articleId);
      // return
    }
    // todo: insert comment
  },

});

export function createArticleDynamics(articleId) {
  return ArticleDynamics.insert({articleId: articleId})
}

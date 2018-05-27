/**
 * Created by livia on 2018/5/6.
 */
import {Meteor} from "meteor/meteor"
import {ArticleDynamics} from './articleDynamics.js'
import {checkIsLogin} from '/imports/app/server/utils.js'
import {App} from '/imports/app.js'

Meteor.methods({
  // dynamicKey: skinCount/praises/stores
  articleDynamic_count(articleId, dynamicKey) {
    Logger.info('########## Methods articleDynamic_count: ', arguments, Meteor.user());
    checkIsLogin();
    const schemaKey = ['praises', 'stores'].find(item => dynamicKey.indexOf(item) !== -1);
    if (!articleId || !schemaKey) {
      throw new Meteor.Error('入参错误：' + arguments)
    }
    const articleDynCur = ArticleDynamics.findOne({$and: [{articleId: articleId}, App.selector.unDeleted]});
    if (!articleDynCur) {
      Logger.error('**** > Methods articleDynamic_count 文章不存在, articleId:', articleId);
      throw App.err.server.whatNotExist(App.strings.collection.articleDynamics)
    }
    const userId = Meteor.userId();
    let dynamicArr = articleDynCur[dynamicKey] || [];
    if (schemaKey === dynamicKey) {
      if (userId === articleDynCur.userId) {
        throw App.err.server.ownInterestErr(App.config.server.interest[schemaKey])
      }
      if (dynamicArr.indexOf(userId) !== -1) {
        return
      }
      dynamicArr.push(userId);
    } else if (dynamicKey.indexOf('cancel') !== -1) {
      const idIndex = dynamicArr.indexOf(userId);
      if (idIndex === -1) {
        return
      }
      dynamicArr.splice(idIndex, 1)
    } else {
      return
    }
    Logger.debug('dynamicArr change to:', dynamicArr);

    return ArticleDynamics.update({_id: articleDynCur._id}, {$set: {[schemaKey]: dynamicArr}})
  },
});

export function createArticleDynamics(articleId) {
  const userId = Meteor.userId();
  return ArticleDynamics.insert({userId: userId, articleId: articleId})
}

export function updateArticleDynComments(articleId, commentInfo) {
  const articleDynCur = ArticleDynamics.findOne({$and: [{articleId: articleId}, App.selector.unDeleted]});
  if (!articleDynCur) {
    Logger.error('**** > Methods articleDynamic_comments 文章不存在, articleId:', articleId);
  }
  Logger.debug('articleDynCur:', articleDynCur);
  let commentArr = articleDynCur.comments || [];
  const replyCommentId = commentInfo.replyCommentId;
  if (replyCommentId) {
    let commentObj = commentArr.find(data => data.commentId === replyCommentId);
    if (commentObj) {
      commentObj.replies.push(commentInfo.id)
    } else {
      Logger.error('**** > Methods articleDynamicComments replyCommentId 错误:', replyCommentId);
      return
    }
  } else {
    commentArr.push({
      commentId: commentInfo.id,
      replies: []
    })
  }
  const commentCount = articleDynCur.commentCount ? articleDynCur.commentCount + 1 : 1;
  Logger.debug('commentArr change to:', commentArr);
  Logger.debug('commentCount change to:', commentCount);
  return ArticleDynamics.update({articleId: articleId}, {$set: {comments: commentArr, commentCount: commentCount}})
}

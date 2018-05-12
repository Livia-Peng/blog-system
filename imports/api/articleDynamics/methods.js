/**
 * Created by livia on 2018/5/6.
 */
import {Meteor} from "meteor/meteor"
import {Article} from '../article/article.js'
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
    const dynamicCount = articleDynCur[dynamicKey] ? articleDynCur[dynamicKey]++ : 1;
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

  combine_article_dynamic(articleId) {
    const articleDoc = Article.findOne({$and: [{_id: articleId}, App.selector.unDeleted]});
    const articleDynDoc = ArticleDynamics.findOne({articleId: articleId});
    if (!articleDoc || !articleDynDoc) {
      throw App.err.server.whatNotExist(App.strings.collection.article);
    }
    const createdUser = Meteor.users.findOne({_id: articleDoc.createdBy});
    if (!createdUser) {
      return {}
    }
    return {
      _id: articleDoc._id,
      name: articleDoc.name,
      abstract: articleDoc.abstract,
      content: articleDoc.content,
      category: articleDoc.category,
      allowComment: articleDoc.allowComment,
      praiseCount: articleDynDoc.praiseCount || '',
      storedCount: articleDynDoc.storedCount || '',
      commentCount: articleDynDoc.comments && articleDynDoc.comments.length ? articleDynDoc.comments.length : '',
      comments: articleDynDoc.comments,
      userId: createdUser._id,
      userName: createdUser.profile.name,
      createdAt: moment(articleDoc.createdAt).format(App.config.format.datetime),
    }
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
  Logger.debug('commentArr change to:', commentArr);
  return ArticleDynamics.update({articleId: articleId}, {$set: {comments: commentArr}})
}

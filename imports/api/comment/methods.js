/**
 * Created by livia on 2018/1/21.
 */
import {Meteor} from "meteor/meteor";
import {check} from "meteor/check";
import {Comment} from "./comment.js";
import {ArticleDynamics} from '/imports/api/articleDynamics/articleDynamics.js'
import {Schemas} from '/imports/schemas.js'
import {App} from "/imports/app.js";
import {Collections} from '/imports/collections.js'
import {checkIsLogin, handleCatchErr, getChangedDoc, schemaValidate} from '/imports/app/server/utils.js'
import {updateArticleDynComments} from '/imports/api/articleDynamics/methods.js'

Meteor.methods({
  comment_insert(insertDoc) {
    Logger.info('########## Methods comment_insert insertDoc: ', insertDoc, Meteor.user());
    checkIsLogin();
    const articleDoc = Collections.Article.findOne({_id: insertDoc.articleId});
    insertDoc.articleTitle = articleDoc.name;
    insertDoc.authorId = articleDoc.createdBy;
    schemaValidate(Schemas.comment, insertDoc, 'comment_insert');
    try {
      const commentId = Comment.insert(insertDoc);
      Logger.info('**** > Methods comment_insert success, id: ', commentId);

      const result = updateArticleDynComments(insertDoc.articleId, {
        id: commentId,
        replyCommentId: insertDoc.replyCommentId
      });
      Logger.info('**** > Methods comment_insert updateArticleDynComments success, num: ', result);

      return commentId
    } catch (err) {
      Logger.error('**** > Methods comment_insert error:', err, {});
      handleCatchErr(err)
    }
  },

  commentList_api(articleId, commentId) {
    Logger.info('########## Methods commentList_api, arguments:', arguments);
    let commentInfo = {};

    const articleDynDoc = ArticleDynamics.findOne({articleId: articleId});
    if (!articleDynDoc || !articleDynDoc.comments) {
      throw App.err.server.whatNotExist(App.strings.collection.articleDynamics);
    }
    const commentDoc = articleDynDoc.comments.find(item => item.commentId === commentId);
    if (!commentDoc) {
      return
    }
    const commentPar = Comment.findOne({_id: commentId});
    if (!commentPar) {
      throw App.err.server.whatNotExist(App.strings.collection.comment);
    }
    const createdUser = Meteor.users.findOne({_id: commentPar.createdBy});
    if (!createdUser) {
      return commentInfo
    }
    commentInfo = {
      userId: createdUser._id,
      userName: createdUser.profile.name,
      content: commentPar.content,
      praiseCount: commentPar.praiseCount || '',
      createdAt: moment(commentPar).format(App.config.format.datetime),
      replyCount: commentDoc.replies && commentDoc.replies.length ? commentDoc.replies.length : '',
      leaf: []
    };
    if (!commentInfo.replyCount) {
      return commentInfo
    }
    const replyComments = Comment.find({_id: {$in: commentDoc.replies}}, {sort: {createdAt: 1}});
    if (!replyComments.count()) {
      commentInfo.replyCount = '';
      return commentInfo
    }
    replyComments.forEach(comment => {
      const replyUser = Meteor.users.findOne({_id: comment.createdBy});
      if (replyUser) {
        commentInfo.leaf.push({
          userId: replyUser._id,
          userName: replyUser.profile.name,
          content: comment.content,
          createdAt: moment(comment.createdAt).format(App.config.format.datetime),
        })
      }
    });
    return commentInfo
  },

  commentRecent_api(blogUserId) {
    Logger.info('########## Methods commentRecent_api, arguments:', arguments);
    const comments = Comment.find(
      {$and: [{authorId: blogUserId}, App.selector.unDeleted]},
      {sort: {createdAt: -1}, limit: 3});
    return comments.map(data => {
      const user = Meteor.users.findOne({_id: data.createdBy});
      return {
        articleTitle: data.articleTitle,
        content: data.content,
        commentedBy: user && user.profile ? user.profile.name : 'unknown',
        createdAt: moment(data.createdAt).format(App.config.format.datetime),
      }
    })
  }
});

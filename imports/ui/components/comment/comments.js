/**
 * Created by livia on 2018/5/12.
 */
import './comments.html'
import {Template} from 'meteor/templating'
import {FlowRouter} from "meteor/kadira:flow-router"
import {Meteor} from 'meteor/meteor'
import {App} from '/imports/app.js'
import {showError} from '/imports/app/client/utils.js'
import {Notify} from '/imports/app/client/notify.js'
import {routerMeta} from '/imports/routerMeta.js'
import {getCommentList} from '/imports/app/client/apiFuncs.js'

Template.articleComment.helpers({
  commentInfo: function () {
    const inst = Template.instance();
    return inst.rCommentInfo.get();
  },
  showReplyText: function () {
    return Template.instance().rShowReplyText.get()
  }
});

Template.articleComment.onCreated(function () {
  this.rCommentInfo = new ReactiveVar();
  this.rShowReplyText = new ReactiveVar(false);

  this.autorun(() => {
    const instData = Template.currentData();
    if (instData.articleId && instData.commentId) {
      getCommentList(instData.articleId, instData.commentId, this.rCommentInfo)
    }
  })
});

Template.articleComment.onRendered(function () {
});

Template.articleComment.events({
  'click button[data-action="write-comment"]': function (event, inst) {
    event.preventDefault();
    const target = $(event.currentTarget);
    const dataFor = target.attr('data-for');
    const isShow = dataFor === 'show';
    inst.rShowReplyText.set(isShow)
  },

  'click button[data-action="reply-comment"]': function (event, inst) {
    event.preventDefault();
    if (!Meteor.userId()) {
      FlowRouter.go(routerMeta.login.name);
    }
    const content = $('textarea[name="replyContent"]').val();
    console.log(content);
    const articleId = inst.data.articleId;
    const commentId = inst.data.commentId;

    SUIBlock.block('保存中...');
    Meteor.call('comment_insert', {
      articleId: articleId,
      content: content,
      replyCommentId: commentId,
    }, function (err, result) {
      SUIBlock.unblock();
      if (err) {
        showError(err)
      } else if (result) {
        inst.rShowReplyText.set(false);
        getCommentList(articleId, commentId, inst.rCommentInfo);
        Notify.saveSuccess();
      }
    })
  },
});

/**
 * Created by livia on 2018/5/12.
 */
import './comments.html'
import {Template} from 'meteor/templating'
import {FlowRouter} from "meteor/kadira:flow-router"
import {Meteor} from 'meteor/meteor'
import {Subs} from '/imports/subs.js'
import {App} from '/imports/app.js'
import {Article} from '/imports/api/article/article.js'
import {showError} from '/imports/app/client/utils.js'
import {Notify} from '/imports/app/client/notify.js'

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
      reNewCommentInfo(instData.articleId, instData.commentId, this.rCommentInfo)
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
      // todo: 请先登录
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
        reNewCommentInfo(articleId, commentId, inst.rCommentInfo);
        Notify.saveSuccess();
      }
    })
  },
});

function reNewCommentInfo(articleId, commentId, rCommentInfo) {
  Meteor.call('comment_find', articleId, commentId, (err, result) => {
    if (err) {
      console.log(err)
    } else if (!_.isEmpty(result)) {
      console.log(result);
      rCommentInfo.set(result)
    }
  })
}

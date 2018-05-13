/**
 * Created by livia on 2018/1/19.
 */
import './articleView.html'
import {Template} from 'meteor/templating'
import {FlowRouter} from "meteor/kadira:flow-router"
import {Meteor} from 'meteor/meteor'
import {Subs} from '/imports/subs.js'
import {App} from '/imports/app.js'
import {Article} from '/imports/api/article/article.js'
import {showError} from '/imports/app/client/utils.js'
import {Notify} from '/imports/app/client/notify.js'
import '/imports/ui/components/nav/blogNav.js'
import '/imports/ui/components/nav/userNav.js'
import '/imports/ui/components/comment/comments.js'

Template.AdminArticleView.helpers({
  articleInfo: function () {
    const inst = Template.instance();
    return inst.rArticleInfo.get();
  }
});

Template.AdminArticleView.onCreated(function () {
  const articleId = FlowRouter.getParam('aid');
  this.rArticleInfo = new ReactiveVar({});
  this.autorun(() => {
    if (articleId) {
      reNewArticleInfo(articleId, this.rArticleInfo)
    }
  })
});

Template.AdminArticleView.onRendered(function () {
  this.autorun(() => {
    const articleDoc = this.rArticleInfo.get();
    if (articleDoc) {
      $('div[id="blog-content"]').append(articleDoc.content);
    }
  })
});

Template.AdminArticleView.events({
  'click a[data-action="dynamic-count"]': function (event, inst) {
    event.preventDefault();
    const target = $(event.currentTarget);
    const dataFor = target.attr('data-for');
    if (!dataFor) {
      return
    }
    console.log(dataFor);
    const articleId = FlowRouter.getParam('aid');
    Meteor.call('articleDynamic_count', articleId, dataFor, function (err, result) {
      if (err) {
        console.log(err)
      } else if (result) {
        console.log(dataFor + 'success')
      }
    })
  },

  'click button[data-action="create-comment"]': function (event, inst) {
    event.preventDefault();
    if (!Meteor.userId()) {
      // todo: 请先登录
    }
    const content = $('textarea[name="commentContent"]').val();
    console.log(content);
    const articleId = FlowRouter.getParam('aid');
    SUIBlock.block('保存中...');
    Meteor.call('comment_insert', {articleId: articleId, content: content}, function (err, result) {
      SUIBlock.unblock();
      if (err) {
        showError(err)
      } else if (result) {
        $('textarea[name="commentContent"]').val('');
        reNewArticleInfo(articleId, inst.rArticleInfo);
        Notify.saveSuccess();
      }
    })
  },
});

function reNewArticleInfo(articleId, rArticleInfo) {
  $('div[id="blog-content"]').empty();
  Meteor.call('combine_article_dynamic', articleId, (err, result) => {
    if (err) {
      console.log(err)
    } else if (!_.isEmpty(result)) {
      // console.log(result);
      rArticleInfo.set(result)
    }
  })
}

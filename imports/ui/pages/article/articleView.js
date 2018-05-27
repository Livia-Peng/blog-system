/**
 * Created by livia on 2018/1/19.
 */
import './articleView.html'
import {Template} from 'meteor/templating'
import {FlowRouter} from "meteor/kadira:flow-router"
import {Meteor} from 'meteor/meteor'
import {Subs} from '/imports/subs.js'
import {App} from '/imports/app.js'
import {Collections} from '/imports/collections.js'
import {showError} from '/imports/app/client/utils.js'
import {Notify} from '/imports/app/client/notify.js'
import {routerMeta} from '/imports/routerMeta.js'
import '/imports/ui/components/nav/blogNav.js'
import '/imports/ui/components/nav/userNav.js'
import '/imports/ui/components/comment/comments.js'

Template.AdminArticleView.helpers({
  articleDoc: function () {
    const inst = Template.instance();
    return inst.rArticleDoc.get();
  },
  articleDynInfo: function () {
    const inst = Template.instance();
    const articleDynDoc = inst.rArticleDynDoc.get();
    const userId = Meteor.userId();
    return {
      praiseCount: articleDynDoc.praises ? articleDynDoc.praises.length : 0,
      praisedStatus: articleDynDoc.praises && articleDynDoc.praises.indexOf(userId) !== -1 ? {
        icon: 'demo-psi-like', text: '取消', dataFor: 'cancel-praises',
      } : {
        icon: 'demo-pli-like', text: '', dataFor: 'praises',
      },
      storedCount: articleDynDoc.stores ? articleDynDoc.stores.length : 0,
      storedStatus: articleDynDoc.stores && articleDynDoc.stores.indexOf(userId) !== -1 ? {
        icon: 'demo-psi-heart-2', text: '取消', dataFor: 'cancel-stores',
      } : {
        icon: 'demo-pli-heart-2', text: '', dataFor: 'stores',
      },
      commentCount: articleDynDoc.commentCount,
      comments: articleDynDoc.comments,
    }
  },
  authorInfo: function () {
    const inst = Template.instance();
    return inst.rAuthorInfo.get();
  },
});

Template.AdminArticleView.onCreated(function () {
  const userId = Meteor.userId();
  const articleId = FlowRouter.getParam('aid');
  this.rArticleDoc = new ReactiveVar({});
  this.rArticleDynDoc = new ReactiveVar({});
  this.rAuthorInfo = new ReactiveVar({});

  this.autorun(() => {
    if (Subs.ready()) {
      const articleDoc = Collections.Article.findOne({$and: [{_id: articleId}, App.selector.unDeleted]});
      const articleDynDoc = Collections.ArticleDynamics.findOne({articleId: articleId});
      if (articleDoc) {
        articleDoc.createdAt = moment(articleDoc.createdAt).format(App.config.format.datetime);
        // console.log(articleDoc);
        this.rArticleDoc.set(articleDoc);
        Meteor.call('account_findName', articleDoc.createdBy, (err, result) => {
          if (err) {
            console.log(err)
          } else if (result) {
            this.rAuthorInfo.set({
              authorId: articleDoc.createdBy,
              authorName: result,
              isAuthor: articleDoc.createdBy === userId,
            })
          }
        })
      }
      if (articleDynDoc) {
        // console.log(articleDynDoc);
        this.rArticleDynDoc.set(articleDynDoc)
      }
    }
  })
});

Template.AdminArticleView.onRendered(function () {
  this.autorun(() => {
    const articleDoc = this.rArticleDoc.get();
    if (articleDoc) {
      $('div[id="blog-content"]').empty();
      $(`div[id="blog-content"]`).append(articleDoc.content);
    }
  })
});

Template.AdminArticleView.events({
  'click a[data-action="dynamic-count"]': function (event, inst) {
    if (!Meteor.userId()) {
      FlowRouter.go(routerMeta.login.name);
      return
    }
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
      FlowRouter.go(routerMeta.login.name);
      return
    }
    const content = $('textarea[name="commentContent"]').val();
    console.log(content);
    const articleDoc = inst.rArticleDoc.get();
    SUIBlock.block('保存中...');
    Meteor.call('comment_insert', {articleId: articleDoc._id, content: content}, function (err, result) {
      SUIBlock.unblock();
      if (err) {
        showError(err)
      } else if (result) {
        $('textarea[name="commentContent"]').val('');
        Notify.saveSuccess();
      }
    })
  },
});

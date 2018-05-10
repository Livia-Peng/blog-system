/**
 * Created by livia on 2018/4/30.
 */
import './articleEdit.html'
import {Template} from 'meteor/templating'
import {FlowRouter} from "meteor/kadira:flow-router"
import {Meteor} from 'meteor/meteor'
import {Subs} from '/imports/subs.js'
import {App} from '/imports/app.js'
import {Article} from '/imports/api/article/article.js'
import {Image} from '/imports/api/image/image.js'
import {getBlogInfoData} from '../../components/artical/articleInfo.js'
import {showError} from '/imports/app/client/utils.js'
import {Notify} from '/imports/app/client/notify.js'
import {routerMeta} from '/imports/routerMeta.js'
import '../../components/artical/articleInfo.js'
import '../../components/forms/formImageUploader.js'

Template.AdminArticleEdit.helpers({
  articleDoc: function () {
    const inst = Template.instance();
    return inst.rArticleDoc.get();
  }
});

Template.AdminArticleEdit.onCreated(function () {
  const articleId = FlowRouter.getParam('aid');
  this.rArticleDoc = new ReactiveVar({});
  this.autorun(() => {
    if (Subs.ready()) {
      const articleDoc = Article.findOne({$and: [{_id: articleId}, App.selector.unDeleted]});
      if (articleDoc) {
        console.log(articleDoc);
        this.rArticleDoc.set(articleDoc)
      }
    }
  })
});

Template.AdminArticleEdit.onRendered(function () {
  setTimeout(function () {
    $('#summernote-content').summernote({
      toolbar: App.config.summerNoteToolbar
    })
  }, 0);

  this.autorun(() => {
    const articleDoc = this.rArticleDoc.get();
    if (articleDoc) {
      $('#summernote-content').summernote('code', articleDoc.content)
    }
  })
});

Template.AdminArticleEdit.events({
  'click button[data-action="save-article"]': function (event, inst) {
    event.preventDefault();
    const target = $(event.target);
    const articleId = FlowRouter.getParam('aid');
    let articleInfo = getBlogInfoData();
    const articleDoc = inst.rArticleDoc.get();
    if (!articleDoc.isPublished) {
      const dataFor = target.attr('data-for');
      switch (dataFor) {
        case 'draft':
          articleInfo.isPublished = false;
          break;
        case 'publish':
          articleInfo.isPublished = true;
          break;
        default:
          return
      }
    }
    articleInfo.name = $('input[name="articleTitle"]').val();
    articleInfo.content = $('#summernote-content').summernote('code');
    // console.log(articleInfo);
    SUIBlock.block('保存中...');
    Meteor.call('article_update', articleId, articleInfo, function (err, result) {
      SUIBlock.unblock();
      if (err) {
        showError(err)
      } else {
        Notify.saveSuccess();
        FlowRouter.go(routerMeta.articleView.name, {aid: articleId})
      }
    })
  },
});

Template.AdminArticleEdit.onDestroyed(function () {
  $('#summernote').summernote('destroy')
});

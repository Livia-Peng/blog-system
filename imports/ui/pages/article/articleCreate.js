/**
 * Created by livia on 2018/1/19.
 */
import './articleCreate.html'
import {Template} from 'meteor/templating'
import {Meteor} from 'meteor/meteor'
import {Image} from '/imports/api/image/image.js'
import {getBlogInfoData} from '../../components/artical/articleInfo.js'
import {showError} from '/imports/app/client/utils.js'
import {Notify} from '/imports/app/client/notify.js'
import {App} from '/imports/app.js'
import {routerMeta} from '/imports/routerMeta.js'
import '../../components/forms/formImageUploader.js'
import '../../components/artical/articleInfo.js'

Template.AdminArticleCreate.helpers({
});

Template.AdminArticleCreate.onCreated(function () {
  this.autorun(() => {
  })
});

Template.AdminArticleCreate.onRendered(function () {
  setTimeout(function () {
    $('#summernote-content').summernote({
      height: 210,
      minHeight: null,
      maxHeight: null,
      placeholder:'请输入文章正文',
      toolbar: App.config.summerNoteToolbar
    })
  }, 0)
});

Template.AdminArticleCreate.events({
  'click button[data-action="save-article"]': function (event, inst) {
    event.preventDefault();
    const target = $(event.target);
    const dataFor = target.attr('data-for');
    let articleInfo = getBlogInfoData();
    switch (dataFor) {
      case 'draft': articleInfo.isPublished = false; break;
      case 'publish': articleInfo.isPublished = true; break;
      default: return
    }
    articleInfo.name = $('input[name="articleTitle"]').val();
    articleInfo.content = $('#summernote-content').summernote('code');
    // console.log(articleInfo);
    SUIBlock.block('保存中...');
    Meteor.call('article_insert', articleInfo, function (err, result) {
      SUIBlock.unblock();
      if (err) {
        showError(err)
      } else if (result) {
        Notify.saveSuccess();
        FlowRouter.go(routerMeta.articleView.name, {aid: result})
      }
    })
  },
});

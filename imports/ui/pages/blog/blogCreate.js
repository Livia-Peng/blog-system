/**
 * Created by livia on 2018/1/19.
 */
import './blogCreate.html'
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

Template.AdminBlogCreate.helpers({
});

Template.AdminBlogCreate.onCreated(function () {
  this.autorun(() => {
  })
});

Template.AdminBlogCreate.onRendered(function () {
  setTimeout(function () {
    $('#summernote-content').summernote({
      height: 210,
      minHeight: null,
      maxHeight: null,
      toolbar: App.config.summerNoteToolbar
    })
  }, 0)
});

Template.AdminBlogCreate.events({
  'click button[data-action="save-article"]': function (event, inst) {
    event.preventDefault();
    const target = $(event.target);
    const dataFor = target.attr('data-for');
    let blogInfo = getBlogInfoData();
    switch (dataFor) {
      case 'draft': blogInfo.isPublished = false; break;
      case 'publish': blogInfo.isPublished = true; break;
      default: return
    }
    blogInfo.name = $('input[name="blogTitle"]').val();
    blogInfo.content = $('#summernote-content').summernote('code');
    // console.log(blogInfo);
    SUIBlock.block('保存中...');
    Meteor.call('blog_insert', blogInfo, function (err, result) {
      SUIBlock.unblock();
      if (err) {
        showError(err)
      } else if (result) {
        Notify.saveSuccess();
        FlowRouter.go(routerMeta.blogView.name, {bid: result})
      }
    })
  },
});

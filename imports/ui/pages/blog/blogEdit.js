/**
 * Created by livia on 2018/4/30.
 */
import './blogEdit.html'
import {Template} from 'meteor/templating'
import {FlowRouter} from "meteor/kadira:flow-router"
import {Meteor} from 'meteor/meteor'
import {Subs} from '/imports/subs.js'
import {App} from '/imports/app.js'
import {Blog} from '/imports/api/blog/blog.js'
import {Image} from '/imports/api/image/image.js'
import {getBlogInfoData} from '../../components/artical/articleInfo.js'
import {showError} from '/imports/app/client/utils.js'
import {Notify} from '/imports/app/client/notify.js'
import {routerMeta} from '/imports/routerMeta.js'
import '../../components/artical/articleInfo.js'
import '../../components/forms/formImageUploader.js'

Template.AdminBlogEdit.helpers({
  blogInfo: function () {
    const inst = Template.instance();
    return inst.rBlogDoc.get();
  }
});

Template.AdminBlogEdit.onCreated(function () {
  const blogId = FlowRouter.getParam('bid');
  this.rBlogDoc = new ReactiveVar({});
  this.autorun(() => {
    if (Subs.ready()) {
      const blogDoc = Blog.findOne({$and: [{_id: blogId}, App.selector.unDeleted]});
      if (blogDoc) {
        console.log(blogDoc);
        $('#summernote-content').summernote('code', blogDoc.content);
        this.rBlogDoc.set(blogDoc)
      }
    }
  })
});

Template.AdminBlogEdit.onRendered(function () {
  setTimeout(function () {
    $('#summernote-content').summernote({
      toolbar: App.config.summerNoteToolbar
    })
  }, 0)
});

Template.AdminBlogEdit.events({
  'click button[data-action="save-article"]': function (event, inst) {
    event.preventDefault();
    const target = $(event.target);
    const blogId = FlowRouter.getParam('bid');
    let blogInfo = getBlogInfoData();
    const blogDoc = inst.rBlogDoc.get();
    if (!blogDoc.isPublished) {
      const dataFor = target.attr('data-for');
      switch (dataFor) {
        case 'draft': blogInfo.isPublished = false; break;
        case 'publish': blogInfo.isPublished = true; break;
        default: return
      }
    }
    blogInfo.name = $('input[name="blogTitle"]').val();
    blogInfo.content = $('#summernote-content').summernote('code');
    // console.log(blogInfo);
    SUIBlock.block('保存中...');
    Meteor.call('blog_update', blogId, blogInfo, function (err, result) {
      SUIBlock.unblock();
      if (err) {
        showError(err)
      } else {
        Notify.saveSuccess();
        FlowRouter.go(routerMeta.blogView.name, {bid: blogId})
      }
    })
  },
});

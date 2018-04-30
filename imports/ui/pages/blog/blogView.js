/**
 * Created by livia on 2018/1/19.
 */
import './blogView.html'
import {Template} from 'meteor/templating'
import {FlowRouter} from "meteor/kadira:flow-router"
import {Meteor} from 'meteor/meteor'
import {Subs} from '/imports/subs.js'
import {App} from '/imports/app.js'
import {Blog} from '/imports/api/blog/blog.js'

Template.AdminBlogView.helpers({
  blogDoc: function () {
    const inst = Template.instance();
    return inst.rBlogDoc.get();
  }
});

Template.AdminBlogView.onCreated(function () {
  const blogId = FlowRouter.getParam('bid');
  this.rBlogDoc = new ReactiveVar({});
  this.autorun(() => {
    if (Subs.ready()) {
      const blogDoc = Blog.findOne({$and: [{_id: blogId}, App.selector.unDeleted]});
      if (blogDoc) {
        // console.log(blogDoc);
        $('div[id="blog-content"]').empty();
        $('div[id="blog-content"]').append(blogDoc.content);
        this.rBlogDoc.set(blogDoc)
      }
    }
  })
});

Template.AdminBlogView.onRendered(function () {
});

Template.AdminBlogView.events({
  'click button[data-action=""]': function (event, inst) {
    event.preventDefault();
    const target = $(event.target);
  },
});

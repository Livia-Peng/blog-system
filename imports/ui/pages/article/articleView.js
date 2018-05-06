/**
 * Created by livia on 2018/1/19.
 */
import './articleView.html'
import {Template} from 'meteor/templating'
import {FlowRouter} from "meteor/kadira:flow-router"
import {Meteor} from 'meteor/meteor'
import {Subs} from '/imports/subs.js'
import {App} from '/imports/app.js'
import {Blog} from '/imports/api/blog/blog.js'

Template.AdminArticleView.helpers({
  articleDoc: function () {
    const inst = Template.instance();
    return inst.rArticleDoc.get();
  }
});

Template.AdminArticleView.onCreated(function () {
  const articleId = FlowRouter.getParam('aid');
  this.rArticleDoc = new ReactiveVar({});
  this.autorun(() => {
    if (Subs.ready()) {
      const articleDoc = Blog.findOne({$and: [{_id: articleId}, App.selector.unDeleted]});
      if (articleDoc) {
        // console.log(articleDoc);
        $('div[id="blog-content"]').empty();
        $('div[id="blog-content"]').append(articleDoc.content);
        this.rArticleDoc.set(articleDoc)
      }
    }
  })
});

Template.AdminArticleView.onRendered(function () {
});

Template.AdminArticleView.events({
  'click button[data-action=""]': function (event, inst) {
    event.preventDefault();
    const target = $(event.target);
  },
});

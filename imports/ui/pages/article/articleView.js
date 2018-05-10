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
      const articleDoc = Article.findOne({$and: [{_id: articleId}, App.selector.unDeleted]});
      if (articleDoc) {
        // console.log(articleDoc);
        this.rArticleDoc.set(articleDoc)
      }
    }
  })
});

Template.AdminArticleView.onRendered(function () {
  this.autorun(() => {
    const articleDoc = this.rArticleDoc.get();
    if (articleDoc) {
      $('div[id="blog-content"]').append(articleDoc.content);
    }
  })
});

Template.AdminArticleView.events({
  'click button[data-action=""]': function (event, inst) {
    event.preventDefault();
    const target = $(event.target);
  },
});

Template.AdminArticleView.onDestroyed(function () {
  $('div[id="blog-content"]').empty();
});

/**
 * Created by livia on 2018/1/18.
 */
import './blogHome.html'
import {Template} from 'meteor/templating'
import {Meteor} from 'meteor/meteor'
import {App} from '/imports/app.js'
import {getBlogList} from '/imports/app/client/apiFuncs.js'
import '/imports/ui/components/blog/blogPanels.js'


Template.blogHome.helpers({
  blogList: function () {
    return Template.instance().rBlogList.get()
  }
});

Template.blogHome.onCreated(function () {
  const selector = {isPublished: true, visibility: 'public'};
  this.rBlogList = new ReactiveVar();
  this.rSelector = new ReactiveVar(selector);

  getBlogList(selector, 1, this.rBlogList)
});

Template.blogHome.onRendered(function () {
  $(window).resize(); // fix if content height < window height});
});

Template.blogHome.events({});

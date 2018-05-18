/**
 * Created by livia on 2018/1/18.
 */
import './blogList.html'
import {Template} from 'meteor/templating'
import {FlowRouter} from "meteor/kadira:flow-router"
import {Meteor} from 'meteor/meteor'
import {Subs} from '/imports/subs.js'
import {App} from '/imports/app.js'
import {getBlogList} from '/imports/app/client/apiFuncs.js'
import '/imports/ui/components/nav/blogNav.js'
import '/imports/ui/components/nav/userNav.js'

Template.AdminBlogList.helpers({
  blogList: function () {
    const inst = Template.instance();
    return inst.rBlogList.get()
  }
});

Template.AdminBlogList.onCreated(function () {
  const userId = FlowRouter.getParam('userId');
  this.rBlogList = new ReactiveVar([]);
  const selector = {isPublished: true, createdBy: userId};
  this.rSelector = new ReactiveVar(selector);

  getBlogList(selector, 1, this.rBlogList)
});

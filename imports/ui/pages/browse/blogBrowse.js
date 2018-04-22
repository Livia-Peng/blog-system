/**
 * Created by livia on 2018/1/18.
 */
import './blogBrowse.html'
import {Template} from 'meteor/templating'
import {Meteor} from 'meteor/meteor'


Template.blogBrowse.helpers({});

Template.blogBrowse.onCreated(function () {
  this.autorun(function () {
    if (Meteor.userId()) {
      FlowRouter.go('Admin.blog')
    }
  })
});

Template.blogBrowse.onRendered(function () {
  $(window).resize(); // fix if content height < window height});
});

Template.blogBrowse.events({});

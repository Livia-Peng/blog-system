/**
 * Created by livia on 2018/1/18.
 */
import './blogBrowse.html'
import {Template} from 'meteor/templating'
import {Meteor} from 'meteor/meteor'


Template.AdminBlogBrowse.created = function () {
  this.autorun(function () {
    if (Meteor.userId()) {
      FlowRouter.go('Admin.blog')
    }
  })
};

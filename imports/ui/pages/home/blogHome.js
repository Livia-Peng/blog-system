/**
 * Created by livia on 2018/1/18.
 */
import './blogHome.html'
import {Template} from 'meteor/templating'
import {Meteor} from 'meteor/meteor'
import '/imports/ui/components/blog/blogPanels.js'


Template.blogHome.helpers({});

Template.blogHome.onCreated(function () {
  this.autorun(function () {
  })
});

Template.blogHome.onRendered(function () {
  $(window).resize(); // fix if content height < window height});
});

Template.blogHome.events({});

/**
 * Created by livia on 2018/1/18.
 */
import './blogHome.html'
import {Template} from 'meteor/templating'
import {Meteor} from 'meteor/meteor'
import '/imports/ui/components/blogPanel/blogPanels.js'


Template.blogBrowse.helpers({});

Template.blogBrowse.onCreated(function () {
  this.autorun(function () {
  })
});

Template.blogBrowse.onRendered(function () {
  $(window).resize(); // fix if content height < window height});
});

Template.blogBrowse.events({});

/**
 * Created by livia on 2018/1/18.
 */
import './blogList.html'
import {Template} from 'meteor/templating'
import { Meteor } from 'meteor/meteor'


Template.AdminBlogList.created = function () {
  this.autorun( function() {
    console.log(Meteor.userId())
    // if (Meteor.user()) {
    //   FlowRouter.go('Admin.browse')
    // }
  })
};

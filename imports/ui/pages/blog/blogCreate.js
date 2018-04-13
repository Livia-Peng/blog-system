/**
 * Created by livia on 2018/1/19.
 */
import './blogCreate.html'
import {Template} from 'meteor/templating'
import { Meteor } from 'meteor/meteor'
import {Image} from '/imports/api/image/image.js'

import '../../components/forms/formImageUploader.js'

Template.AdminBlogCreate.created = function () {
  this.currentUpload = new ReactiveVar(false);

  // this.autorun( function() {
  // })
};

Template.AdminBlogCreate.helpers({
});

Template.AdminBlogCreate.events({
});
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { Image } from '../../../api/image/image.js';

import './formImageUploaderFiles.html'

Template.formImageUploaderFiles.helpers({
  uploadedFiles: function () {
    return Image.find();
  }
});

Template.formImageUploaderFiles.onCreated(function () {
  let isShowingUploadedFiles = Template.currentData().isShowingUploadedFiles;
  let linkId = Template.currentData().linkId;

  if (isShowingUploadedFiles){
    console.log('subscribe unlinkedByUserIdAndLinkedByLinkId, linkId: ' + linkId);
    this.subscribe('image.unlinkedByUserIdAndLinkedByLinkId', linkId);
  }else{
    console.log('subscribe unlinkedByUserId');
    this.subscribe('image.unlinkedByUserId');
  }
});

Template.formImageUploaderFiles.events({
  'click .btn-remove-image': function (event) {
    let id = $(event.target).attr('data-id');
    Image.remove(id);
  }
});

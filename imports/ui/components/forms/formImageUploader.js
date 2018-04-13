import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { Image } from '/imports/api/image/image.js';

import "./formImageUploader.html";

import "./formImageUploaderFiles.js"


Template.formImageUploader.onCreated(function () {
  this.currentFile = new ReactiveVar(false);
});

Template.formImageUploader.helpers({
  currentFile: function () {
    Template.instance().currentFile.get();
  }
});

Template.formImageUploader.events({
  'change #fileInput': function (e, template) {
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      // We tmp only one file, in case
      // there was multiple files selected
      var file = e.currentTarget.files[0];

      Image.insert({
        file: file,
        onStart: function () {
          template.currentFile.set(this);
        },
        onUploaded: function (error, fileObj) {
          if (error) {
            console.log('Error during tmp: ' + error);
          } else {
            console.log(fileObj)
            console.log('File "' + fileObj.name + '" successfully uploaded');
          }
          template.currentFile.set(false);
        },
        streams: 'dynamic',
        chunkSize: 'dynamic'
      });
    }
  }
});
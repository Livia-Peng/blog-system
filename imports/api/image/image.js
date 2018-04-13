/**
 * Created by livia on 2018/1/21.
 */
import {Meteor} from "meteor/meteor";
import { FilesCollection } from 'meteor/ostrio:files';

export const Image = new FilesCollection({
  debug: false,
  collectionName: 'image',
  storagePath: '/tmp/img',
  allowClientCode: true, // Disallow remove files from Client
  onBeforeUpload(file) {
    // Allow tmp files under 10MB, and only in png/jpg/jpeg formats
    if (file.size <= 10485760 && /png|jpg|jpeg/i.test(file.extension)) {
      return true;
    } else {
      return '只允许上传小于10MB的图片文件（jpeg、png）';
    }
  }
});

if (Meteor.isServer) {
  Meteor.publish('images', function imagesPublication() {
    return Image.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    }).cursor;
  });
  Image.allow({
    insert: function() {
      return true;
    },
    update: function() {
      return true;
    },
    remove: function() {
      return true;
    }
  });
}

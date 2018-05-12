/**
 * Created by livia on 2018/4/30.
 */
import './tableCells.html'
import {Template} from 'meteor/templating'
import {Meteor} from 'meteor/meteor'
import {App} from '/imports/app.js'
import {Subs} from '/imports/subs.js'

Template.cellBlogButton.helpers({
});


Template.cellCreatedBy.helpers({
  createdBy: function () {
    return Template.instance().rCreatedBy.get();
  }
});

Template.cellCreatedBy.onCreated(function () {
 this.rCreatedBy = new ReactiveVar('');
 this.autorun(() => {
   const instData = Template.currentData();
   if (instData && instData.createdBy) {
     Meteor.call('account_findName', instData.createdBy, (err, result) => {
       if (err) {
         console.log(err)
       } else if (result) {
         this.rCreatedBy.set(result)
       }
     })
   }
 })
});

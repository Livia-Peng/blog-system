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
    const createdBy = Template.currentData().createdBy;
    if (!Subs.ready()) {
      Subs.subscribe('account_bySelector', {_id: createdBy}, {_id: 1, 'profile.name': 1})
    } else {
      const user = Meteor.users.findOne({_id: createdBy});
      // console.log(user);
      return user && user.profile && user.profile.name ?  user.profile.name : App.strings.noRecord
    }
  }
});

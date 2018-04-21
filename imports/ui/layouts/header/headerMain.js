/**
 * Created by livia on 2018/1/18.
 */
import './headerMain.html'


Template.headerMain.helpers({});

Template.headerMain.onCreated(function () {
  
});

Template.headerMain.onRendered(function () {
  
});

Template.headerMain.events({
  "click a[href='/logout']": function (event) {
    UIBlock.block('登出中...');
    event.preventDefault();
    Meteor.logout(function (err) {
      UIBlock.unblock();
      if (err) {
        console.log(err);
      } else {
        FlowRouter.go('signin')
      }
    })
  },
});

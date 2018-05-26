/**
 * Created by livia on 2018/5/12.
 */
import './userNav.html'
import {App} from '/imports/app.js'

Template.userNav.helpers({
  categoryList: function () {
    return _.keys(App.strings.categories).map(key => {
      return {
        label: App.strings.categories[key],
        value: key
      }
    })
  },
  userInfo: function () {
    const user = Meteor.user();
    if (user) {
      console.log(user);
      return {
        id: user._id,
        name: user.profile.name,
        fans: 2,
        interested: 5
      }
    }
  },
});

Template.userNav.events({
  'click a[data-action="chooseCategory"]': function (event, inst) {
    const target = $(event.currentTarget);
    const dataFor = target.attr('data-for');
    console.log(dataFor)
  }
});

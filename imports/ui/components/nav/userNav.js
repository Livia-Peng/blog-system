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
});

Template.userNav.events({
  'click a[data-action="chooseCategory"]': function (event, inst) {
    const target = $(event.currentTarget);
    const dataFor = target.attr('data-for');
    console.log(dataFor)
  }
});

/**
 * Created by livia on 2018/5/12.
 */
import './userNav.html'
import {App} from '/imports/app.js'
import {getCategoryList} from '/imports/app/client/apiFuncs.js'

Template.userNav.helpers({
  categoryList: function () {
    const inst = Template.instance();
    const categoryArr = inst.rCategoryList.get();
    let categoryList = [];
    categoryArr.forEach(item => {
      if (App.strings.categories.hasOwnProperty(item.value)) {
        categoryList.push({
          label: `${App.strings.categories[item.value]}&nbsp;&nbsp;${item.count}`,
          value: item.value
        })
      }
    });
    return categoryList
  },
  userInfo: function () {
    const user = Meteor.user();
    if (user) {
      // console.log(user);
      return {
        id: user._id,
        name: user.profile.name,
        fans: 2,
        interested: 5
      }
    }
  },
});

Template.userNav.onCreated(function () {
  this.rCategoryList = new ReactiveVar([]);
  this.autorun(() => {
    const instData = Template.currentData();
    if (instData.blogUserId) {
      const selector = {$and: [{isPublished: true, createdBy: instData.blogUserId}]};
      getCategoryList(selector, this.rCategoryList)
    }
  })
});

Template.userNav.events({
});

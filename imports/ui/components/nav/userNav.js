/**
 * Created by livia on 2018/5/12.
 */
import './userNav.html'
import {App} from '/imports/app.js'
import {getCategoryList, getBlogUserInfo, getRecentComments} from '/imports/app/client/apiFuncs.js'

Template.userNav.helpers({
  blogUserInfo: function () {
    const inst = Template.instance();
    const blogUserInfo = inst.rBlogUserInfo.get();
    const curUser = Meteor.user();
    if (blogUserInfo) {
      // console.log(blogUserInfo);
      return {
        id: blogUserInfo.id,
        name: blogUserInfo.name,
        fans: blogUserInfo.fans,
        interested: blogUserInfo.interestedAuthorCount,
        showBtn: curUser && blogUserInfo.id !== curUser._id
      }
    } else if (curUser && curUser.profile) {
      return {
        id: curUser._id,
        name: curUser.profile.name,
        fans: 2,
        interested: 5
      }
    }
  },
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
  curComments: function () {
    const inst = Template.instance();
    return inst.rCurComments.get();
  }
});

Template.userNav.onCreated(function () {
  this.rBlogUserInfo = new ReactiveVar();
  this.rCategoryList = new ReactiveVar([]);
  this.rCurComments = new ReactiveVar([]);

  this.autorun(() => {
    const instData = Template.currentData();
    if (instData.blogUserId) {
      const selector = {$and: [{isPublished: true, createdBy: instData.blogUserId}]};
      getCategoryList(selector, this.rCategoryList);
      getBlogUserInfo(instData.blogUserId, this.rBlogUserInfo);
      getRecentComments(instData.blogUserId, this.rCurComments);
    }
  })
});

Template.userNav.events({});

/**
 * Created by livia on 2018/1/18.
 */
import './blogList.html'
import {Template} from 'meteor/templating'
import {FlowRouter} from "meteor/kadira:flow-router"
import {Meteor} from 'meteor/meteor'
import {Subs} from '/imports/subs.js'
import {App} from '/imports/app.js'
import {getBlogList} from '/imports/app/client/apiFuncs.js'
import '/imports/ui/components/nav/blogNav.js'
import '/imports/ui/components/nav/userNav.js'

Template.AdminBlogList.helpers({
  blogList: function () {
    const inst = Template.instance();
    return inst.rBlogList.get()
  },
  pageBtn: function () {
    const inst = Template.instance();
    const queryResult = inst.rQueryResult.get();
    if (queryResult) {
      inst.rBlogList.set(queryResult.blogList);
      return {
        showPre: queryResult.pageNum > 1,
        showNext: queryResult.pageNum < queryResult.totalPages
      }
    }
  },
  blogUserId: function () {
    return FlowRouter.getParam('userId')
  }
});

Template.AdminBlogList.onCreated(function () {
  const userId = FlowRouter.getParam('userId');
  this.rQueryResult = new ReactiveVar();
  this.rBlogList = new ReactiveVar([]);
  const selector = {$and: [{isPublished: true, createdBy: userId}]};
  this.rSelector = new ReactiveVar(selector);
  this.rSelectedPageNum = new ReactiveVar(1);

  getBlogList(selector, 1, this.rQueryResult)
});

Template.AdminBlogList.events({
  'click a[data-action="change-page"]': function (event, inst) {
    event.preventDefault();
    const target = $(event.currentTarget);
    const dataFor = target.attr('data-for');
    const selector = inst.rSelector.get();
    let selectedPageNum = inst.rSelectedPageNum.get();
    switch (dataFor) {
      case 'previous':
        selectedPageNum--;
        break;
      case 'next':
        selectedPageNum++;
        break;
      default:
        return
    }
    inst.rSelectedPageNum.set(selectedPageNum);
    getBlogList(selector, selectedPageNum, inst.rQueryResult)
  },

  'click a[data-action="chooseCategory"]': function (event, inst) {
    const target = $(event.currentTarget);
    const dataFor = target.attr('data-for');
    // console.log(dataFor);
    let selector = inst.rSelector.get();
    selector['$and'].push({
      category: dataFor
    });
    inst.rSelector.set(selector);
    inst.rSelectedPageNum.set(1);
    getBlogList(selector, 1, inst.rQueryResult)
  }
});

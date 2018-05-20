/**
 * Created by livia on 2018/1/18.
 */
import './blogHome.html'
import {Template} from 'meteor/templating'
import {Meteor} from 'meteor/meteor'
import {App} from '/imports/app.js'
import {getBlogList} from '/imports/app/client/apiFuncs.js'
import '/imports/ui/components/blog/blogPanels.js'
import '/imports/ui/components/nav/blogNav.js'


Template.blogHome.helpers({
  blogList: function () {
    return Template.instance().rBlogList.get()
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
  }
});

Template.blogHome.onCreated(function () {
  const selector = {isPublished: true, visibility: 'public'};
  this.rQueryResult = new ReactiveVar();
  this.rBlogList = new ReactiveVar();
  this.rSelector = new ReactiveVar(selector);
  this.rSelectedPageNum = new ReactiveVar(1);

  getBlogList(selector, 1, this.rQueryResult)
});

Template.blogHome.onRendered(function () {
  $(window).resize(); // fix if content height < window height});
});

Template.blogHome.events({
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
  }
});

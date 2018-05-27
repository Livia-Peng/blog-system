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
  },
  categoryList: function () {
    return _.keys(App.strings.categories).map(key => {
      return {
        label: App.strings.categories[key],
        value: key
      }
    })
  },
});

Template.blogHome.onCreated(function () {
  const selector = {$and: [{isPublished: true, isPublic: true}]};
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
  },
  'click li[data-action="chooseCategory"]': function (event, inst) {
    const target = $(event.currentTarget);
    const dataFor = target.attr('data-for');
    console.log(dataFor)
  },
  'keyup input[name="search-input-xs"]': function (event, inst) {
    if (event.keyCode === 13 || $(event.target).val() === '') {
      $('button[data-for="search-input-xs"]').click();
    }
  },
  'keyup input[name="search-input"]': function (event, inst) {
    if (event.keyCode === 13 || $(event.target).val() === '') {
      $('button[data-for="search-input"]').click();
    }
  },
  'click button[data-action="search-article"]': function (event, inst) {
    const target = $(event.currentTarget);
    const dataFor = target.attr('data-for');
    const searchValue = $(`input[name=${dataFor}]`).val();
    // console.log(searchValue);
    let selector = inst.rSelector.get();
    if (searchValue) {
      selector['$and'].push({
        $or: [
          {
            name: {$regex: searchValue, $options: "$i"}
          },
          {
            abstract: {$regex: searchValue, $options: "$i"}
          },
          {
            content: {$regex: searchValue, $options: "$i"}
          },
        ]
      });
    } else {
      selector['$and'].forEach((data, index) => {
        if (data.hasOwnProperty('$or')) {
          selector['$and'].splice(index, 1);
        }
      })
    }
    inst.rSelector.set(selector);
    getBlogList(selector, 1, inst.rQueryResult)
  }
});

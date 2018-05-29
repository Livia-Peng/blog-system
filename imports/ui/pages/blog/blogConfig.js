/**
 * Created by livia on 2018/5/12.
 */
import './blogConfig.html'
import './tab/articleManage.js'
import './tab/userBlogManage.js'
import './tab/collectionManage.js'
import './tab/userCommentManage.js'
import {Template} from 'meteor/templating'
import {Meteor} from 'meteor/meteor'
import '/imports/ui/components/nav/blogNav.js'
import '/imports/ui/lib/extImports/extImportsDataTables.js'
import '/imports/ui/components/table/tableCells.js'

const tabs = {
  article: 'article',
  userComment: 'userComment',
  collection: 'collection',
  userBlog: 'userBlog',
};
const rCurrentTab = new ReactiveVar(tabs.article);

Template.AdminBlogConfig.helpers({
  tabs: function () {
    const currentTab = rCurrentTab.get();
    return [
      {
        title: '博文管理',
        dataFor: tabs.article,
        active: currentTab === tabs.article ? 'active' : ''
      },
      {
        title: '评论管理',
        dataFor: tabs.userComment,
        active: currentTab === tabs.userComment ? 'active' : ''
      },
      {
        title: '我的收藏',
        dataFor: tabs.collection,
        active: currentTab === tabs.collection ? 'active' : ''
      },
      // {
      //   title: '博客设置',
      //   dataFor: tabs.userBlog,
      //   active: currentTab === tabs.userBlog ? 'active' : ''
      // },
    ]
  },
  dynamic: function () {
    const currentTab = rCurrentTab.get();
    return {
      template: `${currentTab}Manage`,
      data: {}
    }
  }
});

Template.AdminBlogConfig.onCreated(function () {
  this.autorun(() => {
  })
});

Template.AdminBlogConfig.onRendered(function () {
});

Template.AdminBlogConfig.events({
  'click li[data-action="manage-tabs"]': function (event, inst) {
    event.preventDefault();
    const target = $(event.currentTarget);
    const dataFor = target.attr('data-for');
    if (dataFor) {
      rCurrentTab.set(dataFor)
    }
  },
});

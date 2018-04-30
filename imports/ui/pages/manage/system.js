/**
 * Created by livia on 2018/4/30.
 */
import './system.html'
import './blogManage.js'
import './userManage.js'
import {Template} from 'meteor/templating'
import {Meteor} from 'meteor/meteor'
import '/imports/ui/lib/extImports/extImportsDataTables.js'
import '/imports/ui/components/table/tableCells.js'

const tabs = {
  blog: 'blog',
  user: 'user'
};
const rCurrentTab = new ReactiveVar(tabs.blog);

Template.AdminSystem.helpers({
  tabs: function () {
    const currentTab = rCurrentTab.get();
    return [
      {
        title: '博文管理',
        dataFor: tabs.blog,
        active: currentTab === tabs.blog ? 'active' : ''
      },
      {
        title: '用户管理',
        dataFor: tabs.user,
        active: currentTab === tabs.user ? 'active' : ''
      },
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

Template.AdminSystem.onCreated(function () {
  this.autorun(() => {
  })
});

Template.AdminSystem.onRendered(function () {
});

Template.AdminSystem.events({
  'click li[data-action="system-tabs"]': function (event, inst) {
    event.preventDefault();
    const target = $(event.currentTarget);
    const dataFor = target.attr('data-for');
    if (dataFor) {
      rCurrentTab.set(dataFor)
    }
  },
});

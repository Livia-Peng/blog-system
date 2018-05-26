/**
 * Created by livia on 2018/4/19.
 */
import {Template} from 'meteor/templating';
import {Meteor} from 'meteor/meteor';
import {TabularFactory} from './tableBasic.js'
import {Collections} from '/imports/collections.js'
import {App} from '/imports/app.js'
import moment from 'moment'

// 后台账户列表
TabularFactory({
  name: 'account',
  extraFields: [],
  collection: Meteor.users,
  order: [[0, 'desc']],
  selector: function () {
    return {}
  },
  columns: [
    {data: "username", title: "账号"},
    {data: "profile.name", title: "姓名"},
    {
      data: "createdAt",
      title: "创建时间",
      render: function (val) {
        return moment(val).format(App.config.format.datetime) || App.strings.noRecord;
      }
    },
    {
      title: "操作",
      tmpl: Meteor.isClient && Template.cellBlogButton,
      tmplContext(rowData) {
        return rowData;
      }
    }
  ]
});


// 系统博文管理
TabularFactory({
  name: 'systemBlogManage',
  extraFields: ['createdBy'],
  collection: Collections.Article,
  order: [[0, 'desc']],
  selector: function () {
    return {
      $and: [App.selector.unDeleted]
    }
  },
  columns: [
    {data: "name", title: "文章标题"},
    {
      data: "category",
      title: "文章类别",
      render: function (val) {
        return App.strings.categories[val] || App.strings.noRecord
      }
    },
    {
      data: "visibility",
      title: "可见性",
      render: function (val) {
        return App.strings.visibilities[val] || App.strings.noRecord
      }
    },
    {
      data: "allowComment",
      title: "允许评论",
      render: function (val) {
        return val ? '<span class="label label-default">是</span>' : '<span class="label label-warning">否</span>'
      }
    },
    {
      data: "isPublished",
      title: "发布状态",
      render: function (val) {
        return val ? '<span class="label label-success">已发布</span>' : '<span class="label label-default">未发布</span>'
      }
    },
    {
      data: "createdBy",
      title: "创建人",
      tmpl: Meteor.isClient && Template.cellCreatedBy,
      tmplContext(rowData) {
        return {
          createdBy: rowData.createdBy
        }
      }
    },
    {
      data: "createdAt",
      title: "创建时间",
      render: function (val) {
        return moment(val).format(App.config.format.datetime) || App.strings.noRecord
      }
    },
    {
      title: "操作",
      tmpl: Meteor.isClient && Template.cellBlogButton,
      tmplContext(rowData) {
        // rowData.dataFor = 'account';
        // console.log(rowData);
        return rowData;
      }
    }
  ]
});

// 用户博文管理
TabularFactory({
  name: 'userArticleManage',
  extraFields: ['createdBy'],
  collection: Collections.Article,
  order: [[0, 'desc']],
  selector: function () {
    return {
      $and: [{createdBy: Meteor.userId()}, App.selector.unDeleted]
    }
  },
  columns: [
    {data: "name", title: "文章标题"},
    {
      data: "createdAt",
      title: "创建时间",
      render: function (val) {
        return moment(val).format(App.config.format.datetime) || App.strings.noRecord
      }
    },
    {
      data: "category",
      title: "文章类别",
      render: function (val) {
        return App.strings.categories[val] || App.strings.noRecord
      }
    },
    {
      data: "visibility",
      title: "可见性",
      render: function (val) {
        return App.strings.visibilities[val] || App.strings.noRecord
      }
    },
    {
      data: "allowComment",
      title: "允许评论",
      render: function (val) {
        return val ? '<span class="label label-default">是</span>' : '<span class="label label-warning">否</span>'
      }
    },
    {
      data: "isPublished",
      title: "发布状态",
      render: function (val) {
        return val ? '<span class="label label-success">已发布</span>' : '<span class="label label-default">未发布</span>'
      }
    },
    {
      title: "文章动态",
      tmpl: Meteor.isClient && Template.cellArticleDynamic,
      tmplContext(rowData) {
        return rowData;
      }
    },
    {
      title: "操作",
      tmpl: Meteor.isClient && Template.cellBlogButton,
      tmplContext(rowData) {
        return rowData;
      }
    }
  ]
});


// 用户评论管理
TabularFactory({
  name: 'userCommentManage',
  collection: Collections.Comment,
  order: [[0, 'desc']],
  selector: function () {
    return {
      $and: [{createdBy: Meteor.userId()}, App.selector.unDeleted]
    }
  },
  columns: [
    {data: "articleTitle", title: "博文名称"},
    {
      data: "content",
      title: "评论内容",
      render: function (val) {
        return val && val.length >= 10 ? val.slice(0, 9) + '...' : (val || App.strings.noRecord)
      }
    },
    {
      data: "createdAt",
      title: "创建时间",
      render: function (val) {
        return moment(val).format(App.config.format.datetime) || App.strings.noRecord
      }
    },
    {
      data: "createdBy",
      title: "创建人",
      tmpl: Meteor.isClient && Template.cellCreatedBy,
      tmplContext(rowData) {
        return {
          createdBy: rowData.createdBy
        }
      }
    },
    {
      title: "操作",
      tmpl: Meteor.isClient && Template.cellBlogButton,
      tmplContext(rowData) {
        return rowData;
      }
    }
  ]
});

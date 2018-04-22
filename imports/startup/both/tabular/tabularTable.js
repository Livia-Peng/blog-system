/**
 * Created by livia on 2018/4/19.
 */
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import {TabularFactory} from './tableBasic.js'
import Tabular from 'meteor/aldeed:tabular';
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
        // if (val instanceof Date) {
        // } else {
        //   return ;
        // }
      }
    },
    // {
    //   title: "操作",
    //   tmpl: Meteor.isClient && Template.cellButtonAccount,
    //   tmplContext(rowData) {
    //     rowData.dataFor = 'account';
    //     rowData.name = rowData.profile.name;
    //     // console.log(rowData);
    //     return rowData;
    //   }
    // }
  ]
});

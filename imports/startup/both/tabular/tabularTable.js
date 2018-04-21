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
    {data: "username", title: "手机号"},
    {
      data: "profile.name",
      title: "姓名",
      render: (val) => {
        return '<label>姓名</label>' + (val ? val : App.strings.noRecord);
      }
    },
    {
      data: "createdAt",
      title: "创建时间",
      render: function (val) {
        if (val instanceof Date) {
          return '<label>创建时间</label>' + moment(val).format(App.config.format.datetime);
        } else {
          return '<label>创建时间</label>' + App.strings.noRecord;
        }
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

/**
 * Created by livia on 2018/4/19.
 */
import Tabular from 'meteor/aldeed:tabular';
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

const tableBasic = () => {
  return {
    sub: new SubsManager(), //数据缓存
    throttleRefresh: 1500, //改为1.5s才去刷新后台新数据
    pagingType: "simple_numbers", //使用列表方式显示页码
    responsive: true,
    autoWidth: false,
    stateSave: true,
    sDom: '<"top">ft<"bottom"lip>',//disable自带的searchBox
    language: {
      "sProcessing": "数据加载中...",
      "sLengthMenu": "显示 _MENU_ 项结果",
      "sZeroRecords": "没有匹配结果",
      "sInfo": " ，共 _TOTAL_ 项",
      "sInfoEmpty": " ，共 0 项",
      "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
      "sInfoPostFix": "",
      "sSearch": "搜索:",
      "searchPlaceholder": "关键词搜索",
      "sUrl": "",
      "sEmptyTable": "暂无数据",
      "sLoadingRecords": "载入中...",
      "sInfoThousands": ",",
      "oPaginate": {
        "sFirst": "首页",
        "sPrevious": "<",
        "sNext": ">",
        "sLast": "末页"
      },
      "oAria": {
        "sSortAscending": ": 以升序排列此列",
        "sSortDescending": ": 以降序排列此列"
      },
    },
    search: {
      caseInsensitive: false,
      smart: true,
      onEnterOnly: false
    },
    changeSelector(selector = {}) {
      // return selector;
      const user = Meteor.user();
      if (!user) {
        throw new Meteor.Error('用户数据不存在')
      }
      let sel = {
        $and: []
      };
      sel['$and'].push(selector);
      // Logger.debug('==> selector changed to : ', sel);

      return sel;
    }
  };
};


export function TabularFactory(data) {
  return new Tabular.Table(_.extend(tableBasic(), data));
}

/**
 * Created by livia on 2018/4/22.
 */
import {App} from '/imports/app.js'
import {routerMeta} from "/imports/routerMeta"

export const showError = function (error) {
  if (Meteor.isClient) {

    const Notify = require("/imports/app/client/notify").Notify;
    console.log(error.message);

    // 如果 invalidKeys, 一般是插入的key重复了
    if (error.hasOwnProperty("invalidKeys") && error.hasOwnProperty('validationContext')) {
      let errMsgs = error.invalidKeys.map(function (key) {
        return error.validationContext._schema[key.name].label + ' : ' + App.strings.errCollection2[key.type]
      });
      Notify.saveFailure(errMsgs.join(', '));
    } else {
      console.log(error)
      error.details ? Notify.saveFailure("错误！ " + error.details) : Notify.saveFailure("错误！ " + error.message)
    }
  }

  if (Meteor.isServer) {
    Logger.error(error.details);
  }
};

/**
 * 判断id格式是否正确（长度17，数字加大小写字母）
 * @param id:从router上获取的id参数
 * @param view:在哪个页面上，例如：id不满足格式要求，view = '上市公司'，则会报错'错误：上市公司数据不存在'
 * @returns {boolean}
 */
export const checkIdRegEx = function (id, view) {
  return (App.config.regExp.id).test(id)
};

/**
 * 路由id错误跳转not-found页面
 * @param collection
 * @param id: 从router上获取的id参数
 * @param view: 在哪个页面上，例如：id不满足格式要求，view = '上市公司'，则会报错'错误：上市公司数据不存在'
 * @returns {boolean}
 */
export const checkIdExist = function (collection, id, view) {
  if (!checkIdRegEx(id) || !collection.findOne({$and: [{_id: id}, App.selector.unDeleted]})) {
    console.log(view + '不存在, id:', id);
    FlowRouter.go(routerMeta.notFound.name);
    return false
  } else {
    return true
  }
};

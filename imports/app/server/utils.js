/**
 * Created by livia on 2018/4/15.
 */
import {Meteor} from "meteor/meteor"
import {App} from '/imports/app.js'

// 判断是否登录
export const checkIsLogin = function () {
  if (!Meteor.user()) {
    Logger.error('xxxxxxxxxxxxxxx 未登录！xxxxxxxxxxxxxxx');
    throw new Meteor.Error('未登录')
  }
};

// 处理catch到的错误
export const handleCatchErr = function (err) {
  if (err.errorType && err.errorType === 'Meteor.Error') {
    throw err
  } else {
    throw App.err.server.dbWriteErr
  }
};

// schema校验
export const schemaValidate = function (schema, doc, methodName) {
  try {
    schema.validate(doc)
  } catch (err) {
    Logger.debug('**** > Methods ' + methodName + ' schema validate err:', err, {});
    let errStr = '';
    if (err.details && _.isArray(err.details)) {
      err.details.forEach(error => {
        errStr += error.message + '；'
      });
    } else {
      errStr = App.err.server.whatFormatErr('数据')
    }
    throw new Meteor.Error(errStr)
  }
};

// 获取有更改的数据
export const getChangedDoc = function (updateDoc, curDoc) {
  let changedDoc = {};
  _.keys(updateDoc).forEach(key => {
    if (updateDoc[key] === '') {
      return
    }
    // 未插入字段，或值已更改
    if (!curDoc.hasOwnProperty(key)
      || JSON.stringify(updateDoc[key]) !== JSON.stringify(curDoc[key])) {
      changedDoc[key] = updateDoc[key]
    }
  });
  Logger.debug('getChangedDoc > changedDoc:', changedDoc, {});
  return changedDoc
};

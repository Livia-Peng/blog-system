/**
 * Created by livia on 2018/5/18.
 */
import {Meteor} from 'meteor/meteor'
import {showError} from './utils.js'

export function getBlogList(selector, pageNum, rQueryResult) {
  Meteor.call('articleList_api', selector, pageNum, (err, result) => {
    if (err) {
      showError(err)
    } else if (result) {
      console.log(result);
      rQueryResult.set(result)
    }
  })
}

export function getCategoryList(selector, rCategoryList) {
  Meteor.call('categoryList_api', selector, (err, result) => {
    if (err) {
      showError(err)
    } else if (result) {
      console.log(result);
      rCategoryList.set(result)
    }
  })
}

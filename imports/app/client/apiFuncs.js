/**
 * Created by livia on 2018/5/18.
 */
import {Meteor} from 'meteor/meteor'
import {showError} from './utils.js'

export  function getBlogList(selector, pageNum, rBlogList) {
  Meteor.call('articleList_api', selector, pageNum, (err, result) => {
    if (err) {
      showError(err)
    } else if (result) {
      console.log(result);
      rBlogList.set(result)
    }
  })
}
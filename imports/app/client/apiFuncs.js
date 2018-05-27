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
      // console.log(result);
      rQueryResult.set(result)
    }
  })
}

export function getCategoryList(selector, rCategoryList) {
  Meteor.call('categoryList_api', selector, (err, result) => {
    if (err) {
      showError(err)
    } else if (result) {
      // console.log(result);
      rCategoryList.set(result)
    }
  })
}

export function getBlogUserInfo(blogUserId, rBlogUserInfo) {
  Meteor.call('blogUserInfo_api', blogUserId, (err, result) => {
    if (err) {
      showError(err)
    } else if (result) {
      // console.log(result);
      rBlogUserInfo.set(result)
    }
  })
}

export function getCommentList(articleId, commentId, rCommentInfo) {
  Meteor.call('commentList_api', articleId, commentId, (err, result) => {
    if (err) {
      console.log(err)
    } else if (!_.isEmpty(result)) {
      // console.log(result);
      rCommentInfo.set(result)
    }
  })
}
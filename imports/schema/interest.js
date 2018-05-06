/**
 * Created by livia on 2018/1/21.
 */
import {sSchema} from "../sharedSchemas";
import {Tracker} from "meteor/tracker";
// import {App} from '/imports/app';

const interestedBlog = new sSchema({
  articleId: {
    type: String,
    label: '博文id'
  },
  name: {
    type: String,
    label: '博文标题'
  },
  storedAt: {
    type: String,
    label: '收藏时间',
    autoValue: function () {
      if (Meteor.isServer && this.isInsert) {
        return this.isSet ? this.value : new Date()
      }
    }
  }
}, {tracker: Tracker});

const interestedAuthor = new sSchema({
  authorId: {
    type: String,
    label: '博主id'
  },
  name: {
    type: String,
    label: '博主名'
  },
  staredAt: {
    type: String,
    label: '关注时间',
    autoValue: function () {
      if (Meteor.isServer && this.isInsert) {
        return this.isSet ? this.value : new Date()
      }
    }
  }
}, {tracker: Tracker});

const comments = new sSchema({
  commentId: {
    type: String,
    label: '评论id'
  },
  commentAt: {
    type: String,
    label: '发表时间',
    autoValue: function () {
      if (Meteor.isServer && this.isInsert) {
        return this.isSet ? this.value : new Date()
      }
    }
  },
}, {tracker: Tracker});

// 此表由系统创建，关联user表
export const interest = new sSchema({
  userId: {
    type: String,
    label: '用户Id',
    unique: true
  },
  interestedBlog: {
    type: Array,
    label: '收藏的博文',
    optional: true
  },
  'interestedBlog.$': {
    type: interestedBlog,
    optional: true
  },
  interestedAuthor: {
    type: Array,
    label: '关注的博主',
    optional: true
  },
  'interestedAuthor.$': {
    type: interestedAuthor,
    optional: true
  },
  comments: {
    type: Array,
    label: '发表的评论',
    optional: true
  },
  'comments.$': {
    type: comments,
    optional: true
  },

}, {tracker: Tracker});

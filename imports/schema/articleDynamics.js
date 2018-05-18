/**
 * Created by livia on 2018/5/6.
 */
import {sSchema} from "../sharedSchemas";
import {Tracker} from "meteor/tracker";

const comment = new sSchema({
  commentId: {
    type: String,
    label: '评论Id'
  },
  replies: {
    type: Array,
    label: '评论回复',
    optional: true,
  },
  'replies.$': {
    type: String,
    label: '评论回复Id'
  }
});

export const articleDynamics = new sSchema({
  userId: {
    type: String,
    label: '博主id'
  },
  articleId: {
    type: String,
    label: '文章id'
  },
  skinCount: {
    type: Number,
    label: '文章浏览量',
    optional: true,
    autoValue: function () {
      if (Meteor.isServer && this.isInsert) {
        return 0
      }
    }
  },
  praises: {
    type: Array,
    label: '文章点赞',
    optional: true,
  },
  'praises.$': {
    type: String,
    label: '用户id'
  },
  stores: {
    type: Array,
    label: '文章收藏量',
    optional: true,
  },
  'stores.$': {
    type: String,
    label: '用户id'
  },
  commentCount: {
    type: Number,
    label: '文章评论量',
    optional: true,
    autoValue: function () {
      if (Meteor.isServer && this.isInsert) {
        return 0
      }
    }
  },
  comments: {
    type: Array,
    label: '文章评论',
    optional: true,
  },
  'comments.$': {
    type: comment,
    optional: true,
  }
}, {tracker: Tracker});

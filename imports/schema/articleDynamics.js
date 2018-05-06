/**
 * Created by livia on 2018/5/6.
 */
import {sSchema} from "../sharedSchemas";
import {Tracker} from "meteor/tracker";

export const articleDynamics = new sSchema({
  articleId: {
    type: String,
    label: ''
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
  praiseCount: {
    type: Number,
    label: '文章点赞量',
    optional: true,
    autoValue: function () {
      if (Meteor.isServer && this.isInsert) {
        return 0
      }
    }
  },
  storedCount: {
    type: Number,
    label: '文章收藏量',
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
}, {tracker: Tracker});

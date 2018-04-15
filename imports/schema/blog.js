/**
 * Created by livia on 2018/1/21.
 */
import {sSchema, BasicSchema} from "../sharedSchemas";
import {Tracker} from "meteor/tracker";
// import {App} from '/imports/app';

export const blog = new sSchema({
  name: {
    type: String,
    index: 1,
    label: '文章标题'
  },
  abstract: {
    type: String,
    label: '文章摘要',
    option: true,
    autoValue: function () {
      if (this.value) {
        return this.value
      }
      const content = this.field('content').value;
      if (content) {
      //  todo:
      }
    }
  },
  // todo： 存储形式待思考
  content: {
    type: Array,
    label: '文章内容'
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
  // todo: 是否需要
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
  // todo： 存储形式待思考
  comments: {
    type: Array,
    label: '文章评论',
    optional: true,
  },

}, {tracker: Tracker});

blog.extend(BasicSchema);

/**
 * Created by livia on 2018/1/21.
 */
import {sSchema, BasicSchema} from "../sharedSchemas";
import {Tracker} from "meteor/tracker";
// import {App} from '/imports/app';

export const article = new sSchema({
  name: {
    type: String,
    label: '文章标题',
    min: 2,
    max: 15,
  },
  abstract: {
    type: String,
    label: '文章摘要',
    optional: true,
    max: 100,
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
  content: {
    type: String,
    label: '文章内容',
    min: 200,
  },
  isPublished: {
    type: Boolean,
    label: '是否发布',
    optional: true,
  },
  allowComment: {
    type: Boolean,
    label: '是否允许评论',
    optional: true,
  },
  visibility: {
    type: String,
    label: '可见性',
    optional: true,
  },
  category: {
    type: String,
    label: '文章类别',
    optional: true,
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

article.extend(BasicSchema);

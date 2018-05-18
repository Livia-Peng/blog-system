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
    max: 20,
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
  isPublic: {
    type: Boolean,
    label: '在首页公开',
    optional: true,
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
}, {tracker: Tracker});

article.extend(BasicSchema);

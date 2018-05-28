/**
 * Created by livia on 2018/1/21.
 */
import {sSchema} from "../sharedSchemas";
import {Tracker} from "meteor/tracker";
import {App} from '/imports/app';

export const comment = new sSchema({
  authorId: {
    type: String,
    label: '博主Id'
  },
  articleId: {
    type: String,
    label: '博文Id'
  },
  articleTitle: {
    type: String,
    label: '博文名称'
  },
  content: {
    type: String,
    label: '评论内容',
    min: 5,
  },
  replyCommentId: {
    type: String,
    label: '回复的评论Id',
    optional: true,
  },
  praiseCount: {
    type: Number,
    label: '点赞量',
    optional: true,
    autoValue: function () {
      if (Meteor.isServer && this.isInsert) {
        return 0
      }
    }
  },
  createdAt: {
    type: Date,
    label: '创建时间',
    optional: true,
    autoValue: function() {
      if (Meteor.isServer && this.isInsert) {
        return this.isSet ? this.value : new Date();
      } else {
        this.unset();
      }
    },
  },
  createdBy: {
    type: String,
    label: '创建人',
    optional: true,
    autoValue: function () {
      if (Meteor.isServer && this.value) {
        return this.value
      }
      let userId = App.strings.unknown;
      try {
        userId = Meteor.userId() || userId;
      } catch (err) {
        if (Meteor.isServer) Logger.warn('createdBy: user is null');
      }
      if (this.isInsert) {
        return userId;
      } else {
        this.unset();  // Prevent user from supplying their own value
      }
    }
  },
}, {tracker: Tracker});

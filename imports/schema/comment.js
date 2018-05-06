/**
 * Created by livia on 2018/1/21.
 */
import {sSchema, BasicSchema} from "../sharedSchemas";
import {Tracker} from "meteor/tracker";
// import {App} from '/imports/app';

export const comment = new sSchema({
  articleId: {
    type: String,
    label: '博文Id'
  },
  // todo： 存储形式待思考
  content: {
    type: String,
    label: '评论内容'
  },
}, {tracker: Tracker});

comment.extend(BasicSchema);

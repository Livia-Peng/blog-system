/**
 * Created by livia on 2018/1/21.
 */
import {sSchema, BasicSchema} from "../sharedSchemas";
import {Tracker} from "meteor/tracker";
// import {App} from '/imports/app';

export const blog = new sSchema({
  title: {
    type: String,
    unique: true
  },
  // gitlabId: {
  //   type: String
  // }
}, {tracker: Tracker});

blog.extend(BasicSchema);

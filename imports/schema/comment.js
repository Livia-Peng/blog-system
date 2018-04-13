/**
 * Created by livia on 2018/1/21.
 */
import {sSchema, BasicSchema} from "../sharedSchemas";
import {Tracker} from "meteor/tracker";
// import {App} from '/imports/app';

export const comment = new sSchema({
  title: {
    type: String,
    unique: true
  },
}, {tracker: Tracker});

comment.extend(BasicSchema);

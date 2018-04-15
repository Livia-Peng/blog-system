/**
 * Created by Yan on 17/7/27.
 */
import {Meteor} from "meteor/meteor";

Meteor.methods({
  'image.insert'(doc) {
    Logger.debug(doc);
  },
});
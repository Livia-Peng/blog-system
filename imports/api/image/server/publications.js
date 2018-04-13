/**
 * Created by Yan on 17/7/27.
 */

import {Meteor} from "meteor/meteor";
import {check} from "meteor/check";
import {Image} from "../image.js";
import {App} from "/imports/app.js"

Meteor.publish('image.all', function () {
  return Image.find().cursor;
});

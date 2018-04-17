/**
 * Created by livia on 2018/1/21.
 */
import {Meteor} from "meteor/meteor";
import {Schemas} from "./schemas";

import {Blog} from './api/blog/blog.js';
import {Comment} from './api/comment/comment.js';
import {Interest} from './api/interest/interest.js';
import {Image} from './api/image/image.js';

Blog.attachSchema(Schemas.blog);
Comment.attachSchema(Schemas.comment);
Interest.attachSchema(Schemas.interest);

// Meteor.users.attachSchema(Schemas.user);

export const Collections = {
  Blog: Blog,
  Comment: Comment,
  Interest: Interest,
  // Image: Image,
};

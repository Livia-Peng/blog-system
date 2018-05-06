/**
 * Created by livia on 2018/1/21.
 */
import {Meteor} from "meteor/meteor";
import {Schemas} from "./schemas";

import {Article} from './api/article/article.js';
import {Comment} from './api/comment/comment.js';
import {Interest} from './api/interest/interest.js';
import {Image} from './api/image/image.js';

Article.attachSchema(Schemas.article);
Comment.attachSchema(Schemas.comment);
Interest.attachSchema(Schemas.interest);

// Meteor.users.attachSchema(Schemas.user);

export const Collections = {
  Article: Article,
  Comment: Comment,
  Interest: Interest,
  // Image: Image,
};

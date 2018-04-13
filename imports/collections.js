/**
 * Created by livia on 2018/1/21.
 */
import {Schemas} from "./schemas";

import {Blog} from './api/blog/blog.js';
import {Comment} from './api/comment/comment.js';
import {Interest} from './api/interest/interest.js';
import {Image} from './api/image/image.js';

export const Collections = {};
Collections.Blog = Blog;
Collections.Comment = Comment;
Collections.Interest = Interest;
Collections.Image = Image;

Blog.attachSchema(Schemas.blog);
Comment.attachSchema(Schemas.comment);
Interest.attachSchema(Schemas.interest);

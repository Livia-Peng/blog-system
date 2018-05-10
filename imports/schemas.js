/**
 * Created by livia on 2018/1/21.
 */
import {user} from './schema/users.js';
import {article} from './schema/article.js';
import {articleDynamics} from './schema/articleDynamics.js';
import {comment} from './schema/comment.js';
import {interest} from './schema/interest.js';

export const Schemas = {};

Schemas.user = user;
Schemas.article = article;
Schemas.articleDynamics = articleDynamics;
Schemas.comment = comment;
Schemas.interest = interest;

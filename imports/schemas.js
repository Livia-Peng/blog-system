/**
 * Created by livia on 2018/1/21.
 */
import SimpleSchema from "simpl-schema"
import { Tracker } from "meteor/tracker"

import cnMessages from "./startup/both/SchemaMessages.cn.js";
// import { App } from "./app.js";

SimpleSchema.setDefaultMessages(cnMessages);

import {user} from './schema/users.js';
import {blog} from './schema/blog.js';
import {comment} from './schema/comment.js';
import {interest} from './schema/interest.js';

export const Schemas = {};

Schemas.user = user;
Schemas.blog = blog;
Schemas.comment = comment;
Schemas.interest = interest;

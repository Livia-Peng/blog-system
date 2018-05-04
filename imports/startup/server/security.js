// add collection protection here
import {Blog} from "../../api/blog/blog.js";
import {Comment} from "../../api/comment/comment.js"
import {Interest} from "../../api/interest/interest.js"

Blog.permit(['insert', 'update']).allowInClientCode();
Comment.permit(['insert', 'update']).allowInClientCode();
Interest.permit(['insert', 'update']).allowInClientCode();

// Meteor.users.permit(['update', 'remove']).ifLoggedIn();

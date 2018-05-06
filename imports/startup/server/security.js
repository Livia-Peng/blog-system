// add collection protection here
import {Article} from "../../api/article/article.js";
import {Comment} from "../../api/comment/comment.js"
import {Interest} from "../../api/interest/interest.js"

Article.permit(['insert', 'update']).allowInClientCode();
Comment.permit(['insert', 'update']).allowInClientCode();
Interest.permit(['insert', 'update']).allowInClientCode();

// Meteor.users.permit(['update', 'remove']).ifLoggedIn();

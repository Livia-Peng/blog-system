/**
 * Created by livia on 2018/1/21.
 */
import {Meteor} from 'meteor/meteor'
import {checkIsLogin} from '/imports/app/server/utils.js'
import {Blog} from '../blog.js'
import {App} from '/imports/app.js'

Meteor.publish('blog_byId', function (bid) {
  Logger.info('########## Publish blog_byId bid: ', bid, Meteor.user());
  checkIsLogin();

  return Blog.find({$and: [{_id: bid}, App.selector.unDeleted]})
});

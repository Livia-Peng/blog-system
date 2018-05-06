/**
 * Created by livia on 2018/1/21.
 */
import {Meteor} from 'meteor/meteor'
import {checkIsLogin} from '/imports/app/server/utils.js'
import {Article} from '../article.js'
import {App} from '/imports/app.js'

Meteor.publish('article_byId', function (aid) {
  Logger.info('########## Publish article_byId aid: ', aid, Meteor.user());
  checkIsLogin();

  return Article.find({$and: [{_id: aid}, App.selector.unDeleted]})
});

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

Meteor.publish('article_byUserId', function (userId) {
  Logger.info('########## Publish article_byUserId:', userId, Meteor.user());
  checkIsLogin();

  return Article.find({$and: [{createdBy: userId}, App.selector.unDeleted]}, {
    fields: {name: 1, abstract: 1, createdBy: 1, createdAt: 1, isDeleted: 1}
  })
});

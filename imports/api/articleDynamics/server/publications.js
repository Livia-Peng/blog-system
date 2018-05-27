/**
 * Created by livia on 2018/1/21.
 */
import {Meteor} from 'meteor/meteor'
import {checkIsLogin} from '/imports/app/server/utils.js'
import {ArticleDynamics} from '../articleDynamics.js'
import {App} from '/imports/app.js'

Meteor.publish('articleDyn_byAId', function (aid, isCheck = false) {
  Logger.info('########## Publish articleDyn_byAId aid: ', aid, Meteor.user());
  if (isCheck) {
    checkIsLogin();
  }

  return ArticleDynamics.find({$and: [{articleId: aid}, App.selector.unDeleted]})
});

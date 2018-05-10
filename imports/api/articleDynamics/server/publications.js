/**
 * Created by livia on 2018/1/21.
 */
import {Meteor} from 'meteor/meteor'
import {checkIsLogin} from '/imports/app/server/utils.js'
import {ArticleDynamics} from '../articleDynamics.js'
import {App} from '/imports/app.js'

Meteor.publish('articleDynamics_byId', function (aid) {
  Logger.info('########## Publish articleDynamics_byId aid: ', aid, Meteor.user());
  checkIsLogin();

  return ArticleDynamics.find({$and: [{_id: aid}, App.selector.unDeleted]})
});

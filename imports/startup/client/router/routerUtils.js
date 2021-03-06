/**
 * Created by livia on 2018/4/22.
 */
import {Meteor} from 'meteor/meteor'
import {checkIdRegEx} from "/imports/app/client/utils"
import {FlowRouter} from "meteor/kadira:flow-router"
import {Subs} from "/imports/subs.js"

export function routerGen(router, routerDefs) {
  routerDefs.forEach((def) => {
    let triggersEnter = def.hasOwnProperty('triggersEnter') ? def.triggersEnter : [];
    // 如果是admin，需要登录验证
    if (def.name.indexOf('private.') === 0) {
      triggersEnter = [function (context) {
        if (!Meteor.userId()) {
          FlowRouter.go('/login')
        }
      }].concat(triggersEnter);
    }
    router.route(def.path, {
      name: def.name,
      title: def.title,
      parent: def.parent,
      breadcrumb: def.breadcrumb || {},
      action: def.action,
      triggersEnter: triggersEnter,
      subscriptions: def.subs || null
    })
  })
}

export const subsFn = {
  articleById: function (self, params, queryParams, checkLoginIn = false) {
    if (checkIdRegEx(params.aid, '博文')) {
      self.register('articleById', Subs.subscribe('article_byId', params.aid, checkLoginIn));
    }
  },

  articleDynByAId: function (self, params, queryParams, fields = {}) {
    self.register('articleDynByAId', Subs.subscribe('articleDyn_byAId', params.aid));
  },

  system: function (self, params, queryParams) {
    self.register('system', Subs.subscribe('system'));
  }
};

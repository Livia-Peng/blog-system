/**
 * Created by livia on 2018/4/22.
 */
import {checkIdRegEx} from "/imports/app/client/utils";
import {Subs} from "/imports/subs.js";

export function routerGen(router, routerDefs) {
  routerDefs.forEach((def) => {
    let triggersEnter = def.hasOwnProperty('triggersEnter') ? def.triggersEnter : [];
    if (def.name.indexOf('admin.') === 0) { // 如果是admin，需要登录验证
      // triggersEnter = [AccountsTemplates.ensureSignedIn].concat(triggersEnter);
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
  blogById: function (self, params, queryParams) {
    if (checkIdRegEx(params.bid, '博文')) {
      self.register('blogById', Subs.subscribe('blog.byId', params.bid, {}));
    }
  },
  blogAll: function (self, params, queryParams, fields = {}) {
    self.register('blogAll', Subs.subscribe('blog.all', fields));
  },

  system: function (self, params, queryParams) {
    self.register('system', Subs.subscribe('system'));
  }
};

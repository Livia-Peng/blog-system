// Fill the DB with example data on startup
import {Meteor} from "meteor/meteor";
import {Accounts} from "meteor/accounts-base";
import {App} from "/imports/app.js";

Meteor.startup(() => {
  // 创建superAdmin
  createSuperAdmin();
});

/**
 * 创建superAdmin
 */
function createSuperAdmin() {
  const superAdmin = App.config.server.superAdmin;
  // Logger.info('has Logger.info');
  // Logger.debug('has Logger.debug');
  if (superAdmin) {
    let superAdminId = '';
    let superAdminDoc = Meteor.users.findOne({username: superAdmin.username});
    if (!superAdminDoc) {
      superAdminId = Accounts.createUser({
        username: superAdmin.username,
        password: superAdmin.password,
        profile: {
          name: superAdmin.name,
          tel: superAdmin.tel,
          isSuper: true
        }
      });
      Logger.info('=====创建superAdmin，ID为：' + superAdminId + '=====');
    } else {
      superAdminId = superAdminDoc._id;
      Logger.debug('=====superAdmin已经存在，ID为：' + superAdminId + '=====');
    }
  }
}

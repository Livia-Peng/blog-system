// Fill the DB with example data on startup
import {Meteor} from "meteor/meteor";
import {Accounts} from "meteor/accounts-base";
import {App} from "/imports/app.js";

let superAdminId = '';

Meteor.startup(() => {
  // 创建superAdmin
  createSuperAdmin();
});

/**
 * 创建SuperAdmin用户
 */
function createSuperAdmin() {
  const superAdmin = App.config.server.superAdmin;
  console.log('superAdmin', superAdmin);
  if (superAdmin) {
    let superAdminDoc = Meteor.users.findOne({username: superAdmin.username});
    if (!superAdminDoc) {
      superAdminId = Accounts.createUser({
        username: superAdmin.username,
        password: superAdmin.password,
        profile: {
          name: superAdmin.name,
          tel: superAdmin.tel
        }
      });
      console.log('=====创建SuperAdmin，ID为：' + superAdminId + '=====');
    } else {
      superAdminId = superAdminDoc._id;
      console.log('=====SuperAdmin已经存在，ID为：' + superAdminId + '=====');
    }
  }
}

/**
 * Created by livia on 2018/4/29.
 */
import {Meteor} from "meteor/meteor"
import {App} from "/imports/app.js"
import {Collections} from "/imports/collections.js"
import {checkNameRegEx, checkEmailRegEx} from '/imports/app/both/utils.js'
import {handleCatchErr} from '/imports/app/server/utils.js'
import {InviteCode} from '../inviteCode/inviteCode.js'

Meteor.methods({
  /**
   * 账户注册
   * @param insertDoc
   * @returns {boolean}
   */
  account_register (insertDoc) {
    Logger.info('########## Methods account_register insertDoc:', insertDoc);
    /**
     * 1. 验证邀请码是否正确
     * 2. 验证用户名、密码、email格式是否正确
     * 3. 创建账户
     */
    const inviteCodeDoc = InviteCode.findOne({$and: [{code: insertDoc.inviteCode}, App.selector.unDeleted]});
    if (!inviteCodeDoc) {
      Logger.error('邀请码错误');
      // throw App.err.server.inviteCodeErr
    }
    if (!checkNameRegEx(insertDoc.username)) {
      Logger.error('用户名格式错误');
      throw App.err.whatFormatErr('用户名', App.config.format.name)
    }
    if (!checkEmailRegEx(insertDoc.email)) {
      Logger.error('邮箱格式错误');
      throw App.err.whatFormatErr('邮箱')
    }
    try {
      const accountId = createAccount(insertDoc);
      if (accountId) {
        return true
      }
    } catch (err) {
      Logger.error('account_register error:', err, {});
      handleCatchErr(err)
    }
  },

  account_findName (userId) {
    // Logger.info('########## Methods account_findName userId:', userId);
    const user = Meteor.users.findOne({_id: userId});
    if (user && user.profile) {
      // Logger.debug('account_findName user:', user, {});
      return user.profile.name
    }
  },

  blogUserInfo_api (blogUserId) {
    Logger.info('########## Methods blogUserInfo_api blogUserId:', blogUserId);
    const blogUser = Meteor.users.findOne({_id: blogUserId});
    if (blogUser && blogUser.profile) {
      let blogUserInfo = {
        id: blogUserId,
        name: blogUser.profile.name
      };
      const fans = Collections.Interest.find({
        interestedAuthor: {$elemMatch: {authorId: blogUserId}},
      });
      const interestDoc = Collections.Interest.findOne({userId: blogUserId});
      blogUserInfo.fans = fans.count();
      blogUserInfo.interestedAuthorCount = interestDoc && interestDoc.interestedAuthor ?
        interestDoc.interestedAuthor.length : 0;
      return blogUserInfo
    }
  },
});

// 创建账户
export function createAccount(insertDoc) {
  const user = Meteor.users.findOne({username: insertDoc.username});
  if (user) {
    Logger.error('用户已存在');
    throw App.err.server.userExistedErr
  }
  Logger.info('为' + insertDoc.username + '创建账号 >');
  const accountId = Accounts.createUser({
    username: insertDoc.username,
    password: insertDoc.password,
    profile: {
      name: insertDoc.username,
      email: insertDoc.email,
    }
  });
  Logger.info('createAccount success, id: ' + accountId);
  return accountId
}

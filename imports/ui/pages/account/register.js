/**
 * Created by livia on 2018/1/20.
 */
import './register.html'
import {Template} from 'meteor/templating'
import {Meteor} from 'meteor/meteor'
import {FlowRouter} from "meteor/kadira:flow-router"
import {ReactiveDict} from 'meteor/reactive-dict'
import {checkNameRegEx, checkEmailRegEx} from '/imports/app/both/utils.js'
import {App} from '/imports/app.js'

Template.AdminRegister.helpers({
  isSigningUp: function () {
    return Template.instance().registerState.get('isSigningUp');
  },
  registerErrMsg: function () {
    return Template.instance().registerState.get('registerErrMsg');
  }
});

Template.AdminRegister.created = function () {
  this.registerState = new ReactiveDict();
  this.registerState.set('isSigningUp', false);
  this.registerState.set('registerErrMsg', '');
};

Template.AdminRegister.events({
  'submit form': function (event, inst) {
    event.preventDefault();
    const target = event.target;
    const formData = $(target).serializeArray();
    const userAccount = {
      username: formData[0].value,
      password: formData[1].value,
      email: formData[2].value,
      inviteCode: formData[3].value,
    };
    // console.log(userAccount);
    if (inst.registerState.get('isSigningUp')) {
      return
    }
    if (!checkNameRegEx(userAccount.username)) {
      inst.registerState.set('registerErrMsg', App.config.format.name);
      return
    }
    if (!checkEmailRegEx(userAccount.email)) {
      inst.registerState.set('registerErrMsg', '缺少邮箱，或邮箱格式错误！');
      return
    }
    if (!userAccount.inviteCode) {
      inst.registerState.set('registerErrMsg', '必须填写邀请码，请联系系统管理员获取！');
      return
    }

    inst.registerState.set('isSigningUp', true);
    inst.registerState.set('registerErrMsg', '');
    Meteor.call('account_register', userAccount, function (err, result) {
      if (err) {
        console.log(err);
        inst.registerState.set('isSigningUp', false);
        inst.registerState.set('registerErrMsg', err.message);

      } else if (result) {
        Meteor.loginWithPassword(userAccount.username, userAccount.password, (error) => {
          inst.registerState.set('isSigningUp', false);
          if (error) {
            console.log(error);
          } else {
            console.log('register success');
            FlowRouter.go('/');
          }
        })
      }
    })
  },
  'click button[data-action="get-authCode"]': function (event, inst) {
    event.preventDefault();
    const target = event.target;
    // const userAccount = $(target).serializeArray();
  }
});

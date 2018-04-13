/**
 * Created by livia on 2018/1/20.
 */
import './login.html'
import {Template} from 'meteor/templating'
import { Meteor } from 'meteor/meteor'
import { ReactiveDict } from 'meteor/reactive-dict'

Template.AdminLogin.helpers({
  isLoggingIn: function () {
    return Template.instance().loginState.get('isLoggingIn');
  },
  isLoginErr: function () {
    return Template.instance().loginState.get('isLoggingInError');
  },
  loginErrMsg: function () {
    return Template.instance().loginState.get('loginErrMsg');
  }
});


Template.AdminLogin.created = function () {
  let loginState = new ReactiveDict();
  loginState.set('isLoggingIn', false);
  loginState.set('isLoggingInError', false);
  loginState.set('loginErrMsg', '');
  this.loginState = loginState;
};

Template.AdminLogin.events({
  'submit form': function (event, inst) {
    event.preventDefault();
    let target = event.target;
    let userAccount = $(target).serializeArray();
    // console.log(userAccount);

    inst.loginState.set('isLoggingIn', true);
    inst.loginState.set('isLoggingInError', false);

    Meteor.loginWithPassword(userAccount[0].value, userAccount[1].value, (error) => {
      inst.loginState.set('isLoggingIn', false);
      if (error) {
        console.log(error);
        inst.loginState.set('isLoggingInError', true);
        if (error.error === 403) {
          inst.loginState.set('loginErrMsg', '用户名密码错误');
        }
      }else{
        console.log('login success');
        FlowRouter.go('Admin.blog');
      }
    })
  },
});

/**
 * Created by livia on 2018/1/20.
 */
import './login.html'
import {Template} from 'meteor/templating'
import {Meteor} from 'meteor/meteor'
import {FlowRouter} from "meteor/kadira:flow-router"
import {ReactiveDict} from 'meteor/reactive-dict'

Template.AdminLogin.helpers({
  isLoggingIn: function () {
    return Template.instance().loginState.get('isLoggingIn');
  },
  loginErrMsg: function () {
    return Template.instance().loginState.get('loginErrMsg');
  }
});

Template.AdminLogin.created = function () {
  this.loginState = new ReactiveDict();
  this.loginState.set('isLoggingIn', false);
  this.loginState.set('loginErrMsg', '');
};

Template.AdminLogin.events({
  'submit form': function (event, inst) {
    event.preventDefault();
    const target = event.target;
    const formData = $(target).serializeArray();
    // console.log(formData);

    if (inst.loginState.get('isLoggingIn')) {
      return
    }
    inst.loginState.set('isLoggingIn', true);
    inst.loginState.set('loginErrMsg', '');

    Meteor.loginWithPassword(formData[0].value, formData[1].value, (error) => {
      inst.loginState.set('isLoggingIn', false);
      if (error) {
        console.log(error);
        if (error.error === 403) {
          inst.loginState.set('loginErrMsg', '用户名密码错误');
        }
      } else {
        console.log('login success');
        FlowRouter.go('/');
      }
    })
  },
});

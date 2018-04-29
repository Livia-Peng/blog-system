/**
 * Created by livia on 2018/4/29.
 */
import {App} from '/imports/app.js'

export const checkNameRegEx = function (name) {
  return (App.config.regExp.name).test(name)
};

export const checkEmailRegEx = function (email) {
  return (App.config.regExp.email).test(email)
};

export const checkPasswordRegEx = function (password) {
  return password && 3 < String(password).length < 10
};

export const checkTelRegEx = function (tel) {
  return (App.config.regExp.tel).test(tel)
};

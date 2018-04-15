// Fill the DB with example data on startup
import {Meteor} from "meteor/meteor";
import {EJSON} from 'meteor/ejson';
import {App} from '/imports/app'

const winston = require('winston');
require('winston-mongodb').MongoDB;

export const Logger = new (winston.Logger)({
  // level: App.env.isDebug ? 'debug' : 'info',
  level: 'debug',
  transports: [
    new (winston.transports.Console)({
      handleExceptions: true,
      timestamp: function () {
        return Date.now();
      },
      formatter: function (options) {
        const hasMeta = options.meta && Object.keys(options.meta).length;
        const hasUser = hasMeta
          && _.isObject(options.meta)
          && options.meta.hasOwnProperty('profile')
          && options.meta.profile.hasOwnProperty('name');

        const user = hasUser ? `${options.meta.profile.name} ${options.meta.profile.tenant.active} ${options.meta._id}` : '-';
        const meta = hasMeta ? '-META-> \n\t -> ' + EJSON.stringify(options.meta) : '';

        // Return string will be passed to logger.
        const timestamp = moment(options.timestamp()).format(App.config.format.datetimeLog);
        const level = options.level.toUpperCase();
        const message = (options.message || options.message == 0) ? options.message : "";

        return `${timestamp} [${level}] [${user}] ${message} ${hasUser ? '' : meta}`
      }
    }),
    // 屏蔽 logging 到 mongodb
    // new (winston.transports.MongoDB)({
    //   handleExceptions: true,
    //   level: Meteor.settings.private.log.level,
    //   collection: Meteor.settings.private.log.collection,
    //   db: process.env.MONGO_URL,
    //   expireAfterSeconds: 324000,
    // })
  ]
});

global.Logger = Logger;

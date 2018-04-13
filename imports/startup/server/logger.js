// Fill the DB with example data on startup
import {Meteor} from "meteor/meteor";
import {EJSON} from 'meteor/ejson';
import {App} from '/imports/app'

global.Logger = {};

Meteor.startup(() => {
  let winston = require('winston');
  require('winston-mongodb').MongoDB;

  global.Logger = new (winston.Logger)({
    level: App.config.isDebug ? 'debug' : 'info',
    transports: [
      new (winston.transports.Console)({
        handleExceptions: true,
        timestamp: function() {
          return Date.now();
        },
        formatter: function(options) {
          // Return string will be passed to logger.
          return moment(options.timestamp()).format(App.config.format.datetimeLog) +' '+
                 options.level.toUpperCase() +' '+ ((options.message || options.message === 0) ? options.message : "") +
                 (options.meta && Object.keys(options.meta).length ? '\n\t'+ EJSON.stringify(options.meta) : '' );
        }
      }),
      new (winston.transports.MongoDB)({
        handleExceptions: true,
        level: Meteor.settings.private.log.level,
        collection: Meteor.settings.private.log.collection,
        db: process.env.MONGO_URL,
      })
    ]
  });
});

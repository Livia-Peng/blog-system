/**
 * Created by livia on 2018/1/20.
 */
import {check} from 'meteor/check'
import {Session} from 'meteor/session'
import {Template} from 'meteor/templating'
import {App} from '/imports/app.js'

Template.registerHelper('currentPath', () => FlowRouter.current().path);

Template.registerHelper('App', App);

/**
 * Created by livia on 2018/1/20.
 */
import {Template} from 'meteor/templating'
import {App} from '/imports/app.js'
import {routerMeta} from '/imports/routerMeta.js'

Template.registerHelper('currentPath', () => FlowRouter.current().path);

Template.registerHelper('App', App);

Template.registerHelper('ROUTER', routerMeta);

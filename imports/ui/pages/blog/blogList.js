/**
 * Created by livia on 2018/1/18.
 */
import './blogList.html'
import {Template} from 'meteor/templating'
import {FlowRouter} from "meteor/kadira:flow-router"
import {Meteor} from 'meteor/meteor'
import {Collections} from '/imports/collections.js'
import {Subs} from '/imports/subs.js'
import {App} from '/imports/app.js'
import '/imports/ui/components/nav/blogNav.js'
import '/imports/ui/components/nav/userNav.js'

Template.AdminBlogList.helpers({
  blogList: function () {
    const inst = Template.instance();
    return inst.rBlogList.get()
  }
});

Template.AdminBlogList.onCreated(function () {
  const userId = FlowRouter.getParam('userId');
  this.rBlogList = new ReactiveVar([]);

  this.autorun(() => {
    if (Subs.ready()) {
      const user = Meteor.users.findOne({_id: userId});
      const articles = Collections.Article.find({$and: [{createdBy: userId}, App.selector.unDeleted]}).fetch();
      if (!user || !user.profile || !articles) {
        return
      }
      // console.log(articles)
      const articleIdList = _.pluck(articles, '_id');
      const articleDynList = Collections.ArticleDynamics.find({articleId: {$in: articleIdList}}).fetch();
      const blogList = articles.map(data => {
        const articleDyn = articleDynList.find(ele => ele.articleId === data._id);
        return {
          articleId: data._id,
          articleName: data.name,
          articleAbstract: data.abstract,
          createdBy: user.profile.name,
          createdAt: moment(data.createdAt).format(App.config.format.datetime),
          skinCount: articleDyn && articleDyn.skinCount ? articleDyn.skinCount : '',
          praiseCount: articleDyn && articleDyn.praiseCount ? articleDyn.praiseCount : '',
          storedCount: articleDyn && articleDyn.storedCount ? articleDyn.storedCount : '',
          commentCount: articleDyn && articleDyn.comments && articleDyn.comments.length ? articleDyn.comments.length : '',
        }
      });
      console.log(blogList);
      this.rBlogList.set(blogList)
    }
  })
});

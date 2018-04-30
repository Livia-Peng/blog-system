/**
 * Created by livia on 2018/4/30.
 */
import './articleInfo.html'
import {Template} from 'meteor/templating'
import {App} from '/imports/app.js'

Template.articleInfo.helpers({
  categoryList: function () {
    const instData = Template.currentData();
    const blogInfo = instData.blogInfo || {};  // 新建时无值
    return Object.keys(App.strings.categories).map(key => {
      if (key === blogInfo.category) {
        return {
          label: App.strings.categories[key],
          value: key,
          selected: 'selected'
        }
      }
      return {
        label: App.strings.categories[key],
        value: key,
        selected: ''
      }
    })
  }
});

Template.articleInfo.onRendered(function () {
  this.autorun(() => {
    const instData = Template.currentData();
    if (instData.blogInfo) {
      $('select [name="visibility"]').val(instData.blogInfo.visibility)
    }
  })
});

Template.articleInfo.events({
});

export function getBlogInfoData() {
  return {
    abstract: $('textarea[name="abstract"]').val(),
    visibility: $('select[name="visibility"]').val(),
    category: $('select[name="category"]').val(),
    allowComment: $('input[name="allowComment"]').is(':checked')
  }
}

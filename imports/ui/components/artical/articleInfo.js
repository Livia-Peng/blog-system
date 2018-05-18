/**
 * Created by livia on 2018/4/30.
 */
import './articleInfo.html'
import {Template} from 'meteor/templating'
import {App} from '/imports/app.js'

Template.articleInfo.helpers({
  categoryList: function () {
    const instData = Template.currentData();
    const articleInfo = instData.articleInfo || {};  // 新建时无值
    return Object.keys(App.strings.categories).map(key => {
      if (key === articleInfo.category) {
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
    if (instData.articleInfo) {
      $('select [name="visibility"]').val(instData.articleInfo.visibility)
    }
  })
});

Template.articleInfo.events({
});

export function getBlogInfoData() {
  return {
    abstract: $('textarea[name="abstract"]').val(),
    // visibility: $('select[name="visibility"]').val(),
    category: $('select[name="category"]').val(),
    allowComment: $('input[name="allowComment"]').is(':checked'),
    isPublic: $('input[name="isPublic"]').is(':checked'),
  }
}

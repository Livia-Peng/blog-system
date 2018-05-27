/**
 * Created by livia on 2018/1/18.
 */
import {Meteor} from "meteor/meteor"

export const App = {};

App.config = {
  siteTitle: '个人博客系统',
  format: {
    datetime: "YYYY-MM-DD HH:mm",
    datetimeLog: "YYYY-MM-DD HH:mm:ss SSS",
    name: '用户名只允许由字母、数字、下划线、中划线组成，4-16位',
  },
  regExp: {
    name: /^[a-zA-Z0-9_-]{4,16}$/, // 字母、数字、下划线、减号组成，字母开头，4-16位
    email: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, // 只允许英文字母、数字、下划线、英文句号、以及中划线组成
    tel: /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/, // 手机号码正则匹配式
    id: /^[A-Za-z0-9]{17}$/, //id正则匹配
    qq: /^[1-9][0-9]{4,10}$/, //qq正则匹配
    wx: /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/, //微信正则匹配
  },
  summerNoteToolbar: [
    ['style', ['style', 'fontsize', 'color']],
    ['format', ['bold', 'italic', 'underline', 'strikethrough', 'clear']],
    ['paragraph', ['ol', 'ul', 'paragraph', 'height']],
    ['insert', ['table', 'hr', 'undo', 'redo', 'fullscreen']],
  ],
};

App.strings = {
  unknown: 'unknown',
  noRecord: '无',
  firstOption: '- 请选择 -',
  categories: {
    none: '无分类',
    internet: '互联网',
    develop: '技术开发',
    literature: '文字',
    movies: '电影',
    musics: '音乐',
    travel: '旅行',
    entertainment: '游戏娱乐',
    sports: '运动',
    family: '家庭',
    work: '工作',
    study: '学习',
  },
  visibilities: {
    public: '所有人可见',
    // friend: '仅好友可见',
    private: '仅自己可见'
  },
  collection: {
    user: '用户',
    article: '博文',
    articleDynamics: '博文动态信息',
    comment: '评论',
  },
  dynamicKey: {
    skinCount: 'skinCount',
    praiseCount: 'praiseCount',
    storedCount: 'storedCount',
  },
};

App.selector = {
  unDeleted: {
    $or: [
      {isDeleted: false},
      {isDeleted: {$exists: false}}
    ]
  },
  defaultFields: {
    lastUpdatedBy: 1,
    lastUpdatedAt: 1,
    createdBy: 1,
    createdAt: 1,
    isDeleted: 1
  },
  unPublished: {
    $or: [
      {isPublished: false},
      {isPublished: {$exists: false}}
    ]
  },
};

App.err = {
  whatFormatErr: (what, format = '') => new Meteor.Error(what + '格式错误！' + format),
};

if (Meteor.isServer) {
  App.env = {
    isDebug: !!process.env.isDebug || false,
  };

  App.config.server = {
    superAdmin: {
      username: "admin",
      password: "superAdmin",
      name: "超级管理员",
      tel: "17612739581",
      email: 'livia_peng@163.com',
    },
    interest: {
      praises: '推送',
      stores: '收藏',
    },
  };

  App.err.server = {
    inviteCodeErr: new Meteor.Error('邀请码错误'),
    dbWriteErr: new Meteor.Error('系统异常，请联系系统管理员'),
    userExistedErr: new Meteor.Error('用户名已存在，请登录，或更改注册用户名'),
    whatNotExist: (what) => new Meteor.Error(what + '不存在或部分数据缺失'),
    dupOperateErr: (operation) => new Meteor.Error('数据已' + operation + '，请勿重复' + operation),
    ownInterestErr: (operation) => new Meteor.Error('不能' + operation + '自己的内容'),
  }
}

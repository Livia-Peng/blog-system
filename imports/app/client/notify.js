// import 'animate.css/animate.css'

export const Notify = {
  trigger: function (configs = {
                       icon: 'glyphicon glyphicon-info-sign',
                       title: 'title',
                       message: 'message',
                       type: 'warning'
                     },
                     settings = {
                       container: 'floating',
                       closeBtn: false,
                       floating: {
                         position: "top-right",
                         animationIn: 'bounceInRight',
                         animationOut: 'fadeOutDown'
                       },
                       focus: true,
                       timer: 3500
                     }) {
    const contents = {
      type: configs.type,
      html: '<div class="media-left"><span class="icon-wrap icon-wrap-xs icon-circle alert-icon">' +
              `<i class="${configs.icon} icon-lg"></i>` +
            '</span></div>' +
            '<div class="media-body">' +
              `<h4 class="alert-title">${configs.title}</h4>` +
              `<p class="alert-message">${configs.message}</p>` +
            '</div>',
    };
    // console.log(_.extend(contents, settings));
    $.niftyNoty(_.extend(contents, settings));
  },

  infoNotice (message = '') {
    this.trigger({
      icon: 'glyphicon glyphicon-info-sign',
      title: '提示',
      message: message,
      type: 'info'
    });
  },

  editFailure(message = '') {
    this.trigger({
      icon: 'glyphicon glyphicon-info-sign',
      title: '操作失败！',
      message: message,
      type: 'warning'
    });
  },

  saveSuccess() {
    this.trigger({
      icon: 'glyphicon glyphicon-info-sign',
      title: '保存成功！',
      message: '',
      type: 'success'
    });
  },

  saveFailure(msg = '保存失败！') {
    this.trigger({
      icon: 'glyphicon glyphicon-info-sign',
      title: msg,
      message: '',
      type: 'danger'
    });
  },

  delSuccess() {
    this.trigger({
      icon: 'glyphicon glyphicon-info-sign',
      title: '删除成功！',
      message: '',
      type: 'success'
    });
  }
};

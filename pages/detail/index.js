//index.js
//获取应用实例
const app = getApp();

Page({
  data: {
    formId: null,
    finishPrecent: null,
    formInfo: null

  },

  //页面加载
  onLoad: function(options) {
    this.setData({
      formId: options.formId,
      finishPrecent: options.finishPrecent
    });
    this.getFormDetail();
  },

  //收藏任务
  collectTask(event) {
    this.collectForm();
    wx.showToast({
      title: '任务已收藏',
    })

  },
  popClose(event) {
    this.setData({
      popShow: false
    });
  },

  //开始任务
  doTask(event) {
    this.collectForm();
    var formId = this.data.formId;
    wx.redirectTo({
      url: '/pages/label/index?formId=' + formId,
    })
  },

  //获取任务详情
  getFormDetail: function() {
    var url = app.globalData.hostUrl + "/portal/getFormDetail.do";
    wx.request({
      url: url,
      method: 'POST',
      data: {
        formId: this.data.formId
      },
      success: res => {
        this.setData({
          'formInfo': res.data
        })
      }
    })
  },

  //收藏任务
  collectForm: function () {
    var url = app.globalData.hostUrl + "/portal/collectForm.do";
    wx.request({
      url: url,
      method: 'POST',
      data: {
        formId: this.data.formId,
        openid: wx.getStorageSync("openid")
      },
      success: res => {
      }
    })
  }






})
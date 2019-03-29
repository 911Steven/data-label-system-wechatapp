//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    formId: null,
    formInfo: null,
    dataSource: []
  },

  //页面加载
  onLoad: function(options) {
    this.setData({
      formId: options.formId,
    });
    this.getFormDetail();
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
  //获取任务数据源信息
  getDataSource: function() {
    var url = app.globalData.hostUrl + "/portal/getDataSource.do";
    wx.request({
      url: url,
      method: 'POST',
      data: {
        formId: this.data.formId,
        openid: wx.getStorageSync("openid")
      },
      success: res => {
        this.setData({
          dataSource: res.data
        })
      }
    })
  },

  onClick(event) {

  },

  radioOnChange(event) {
    console.log(event.name)
  },

  textOnChange(event) {

  }




})
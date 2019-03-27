//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    popShow: false,
  },

  //收藏任务
  collectTask(event) {

    this.setData({
      popShow: true
    });

  },
  popClose(event) {
    this.setData({
      popShow: false
    });
  },

  //开始任务
  doTask(event) {
    wx.redirectTo({
      url: '/pages/label/index',
    })
  }





})
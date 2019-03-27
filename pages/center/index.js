//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    tab_active: 0,

  },

  //切换标签
  formTabChange(event) {

  },

  //跳转到详情页
  toDetail(event) {
    wx.navigateTo({
      url: '/pages/detail/index',
    })
  }



})
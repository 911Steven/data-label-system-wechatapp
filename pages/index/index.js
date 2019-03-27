//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    tar_bar_active: 0,
    tab_active: 0,
  },

  //切换导航
  barChange(event) {
    console.log(event.detail);
    wx.redirectTo({
      url: '/pages/userInfo/userInfo'
    })

  },

  //切换标签
  formTabChange(event) {
    
  }



})

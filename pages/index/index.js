const app = getApp();

Page({
  data: {
    currentTab: 0,
    tab_active: 0,
    allFormCount: 12,
    allTaskCount: 800,
    myAllTaskCount: 0,
    myFinishTaskCount: 0,
    myRunTaskCount: 0,
    forms: [],
    myTasks:[]


  },
  
  // 显示加载
  onShow:function(){
    this.getFormStat();
    this.getFormList(0);
    this.getMyTaskList();
  },

  //切换导航
  barChange(event) {
    this.setData({
      currentTab: event.detail
    })
  },

  //任务中心切换标签
  formTabChange(event) {
    this.getFormList(event.detail.index);
  },

  //跳转到详情页
  toDetail:function(event) {
    var formId = event.target.dataset.formId;
    var finishPrecent = event.target.dataset.finishPrecent;
    wx.navigateTo({
      url: '/pages/detail/index?formId=' + formId + '&finishPrecent=' + finishPrecent,
    })
  },

  //获取表单统计概况
  getFormStat: function() {
    var url = app.globalData.hostUrl + "/portal/getAllFormStat.do";
    wx.request({
      url: url,
      method: 'POST',
      data: {
        openid: wx.getStorageSync("openid")
      },
      success: res => {
        this.setData({
          'allFormCount': res.data.formCount,
          'allTaskCount': res.data.taskCount,
          'myAllTaskCount': res.data.myAllTaskCount,
          'myFinishTaskCount': res.data.myFinishTaskCount,
          'myRunTaskCount': res.data.myRunTaskCount
        })
      }
    })
  },

  //获取数据标注模版列表
  getFormList: function(type) {
    var url = app.globalData.hostUrl + "/portal/getForm.do";
    wx.request({
      url: url,
      method: 'POST',
      data: {
        type: type,
        openid: wx.getStorageSync("openid")
      },
      success: res => {
        this.setData({
          'forms': res.data
        })
      }
    })
  },

  //获取我的任务列表
  getMyTaskList: function () {
    var url = app.globalData.hostUrl + "/portal/getTodoTask.do";
    wx.request({
      url: url,
      method: 'POST',
      data: {
        openid: wx.getStorageSync("openid")
      },
      success: res => {
        this.setData({
          'myTasks': res.data
        })
      }
    })
  }








})
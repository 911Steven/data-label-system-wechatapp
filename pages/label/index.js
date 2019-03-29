//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    radio: 1,
    curDataIdx: 0,
    curFieldContent: null,
    formId: null,
    formInfo: null,
    dataSource: [],
    labels: []
  },

  //页面加载
  onLoad: function(options) {
    this.setData({
      formId: options.formId,
    });
    this.getFormDetail();
    this.getDataSource();
  },

  //获取任务详情
  getFormDetail: function() {
    var url = app.globalData.hostUrl + "/portal/getFormDetailInTask.do";
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

  //单选按钮更改
  radioOnChange: function(event) {
    // console.log(event.target.dataset.name)
    // console.log(event.target.dataset.itemOptionId)
    this.setData({
      radio: event.target.dataset.name
    })
  },

  //文本框输入
  textOnChange: function(event) {
    this.setData({
      curFieldContent: event.detail
    })
  },

  //下一条标注数据
  nextDataSource: function(event) {
    var index = this.data.curDataIdx;
    var content;
    if (this.data.formInfo.itemType == 2) {
      content = this.data.formInfo.itemOption[this.data.radio - 1].itemOptionId
    } else {
      content = this.data.curFieldContent;
    }
    var label = {
      dataSourceId: this.data.dataSource[index].dataSourceId,
      content: content
    }
    this.data.labels.push(label);
    //复原数据
    this.setData({
      curDataIdx: index + 1,
      radio: 1,
      curFieldContent: null
    })
  },

  //提交数据
  submitData: function(event) {
    var index = this.data.curDataIdx;
    var content;
    if (this.data.formInfo.itemType == 2) {
      content = this.data.formInfo.itemOption[this.data.radio - 1].itemOptionId
    } else {
      content = this.data.curFieldContent;
    }
    var label = {
      dataSourceId: this.data.dataSource[index].dataSourceId,
      content: content
    }
    this.data.labels.push(label);
    //提交请求
    var url = app.globalData.hostUrl + "/portal/submitFormInstance.do";
    wx.request({
        url: url,
        method: 'POST',
        data: {
          formId: this.data.formId,
          openid: wx.getStorageSync("openid"),
          labels: this.data.labels
        },
        success: res => {
          this.setData({})
        }
      }),
      //返回首页
      wx.navigateBack({
        delta: 5
      })
  },

  //保存进度并返回主城
  saveProgress:function(event){
    this.submitData(event);
  }




})
//app.js
App({
  globalData: {
    hostUrl: 'https://www.assad.site'
  },
  onLaunch: function() {
    var loginUrl = this.globalData.hostUrl + '/portal/wxLogin.do';
    wx.login({
      success: function(res) {
        if (res.code) {
          //获取openid
          wx.request({
            url: loginUrl,
            method: 'POST',
            data: {
              code: res.code
            },
            success: res => {
              wx.setStorageSync("openid", res.data.openid);
              console.log(wx.getStorageSync("openid"));
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });

  }

})
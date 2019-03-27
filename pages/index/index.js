Page({
  data: {
    currentTab : 0
  },

  //切换导航
  barChange(event) {
    this.setData({
      currentTab:event.detail
    })
  },
})
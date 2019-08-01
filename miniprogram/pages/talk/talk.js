// miniprogram/pages/talk/talk.js
var n = 10;
const db = wx.cloud.database();
const talk = db.collection('school-talk');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  input(e) {

    var value = e.detail.value;
    this.setData({
      value,
    })
  },
  confrime() {
    var that = this;
    var text = this.data.value;
    this.setData({
      text: text,
      value: ''
    })
    if (text != '') {

      talk.add({
        data: {
          url: that.data.url,
          name: that.data.name,
          text: text,
          index: that.data.index,

        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.setData({
      index: options.index
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
    wx.getStorage({
      key: 'user',
      success: function(res) {
        console.log(res)
        var url = res.data.url;
        var name = res.data.name;
        // var flag = true;
        that.setData({
          url,
          name,
          // flag,
        })
      },
    })
     setInterval(() => {

      talk.where({
        index: that.data.index
    }).get({
        success: function(res) {
          console.log(res.data)
          that.setData({
            alltalk: res.data
          })
        }
      })
     }, 1000)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    // wx.startPullDownRefresh()
    // setTimeout(() => {
    //   // 标题栏隐藏刷新转圈圈图标
    //   wx.hideNavigationBarLoading()
    //   wx.stopPullDownRefresh()
    // }, 2000);
    console.log('1111')
    n += 10;
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    // wx.startPullDownRefresh()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
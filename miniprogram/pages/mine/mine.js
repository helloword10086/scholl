// miniprogram/pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
       flag:false,
  },
  mylife() {
    wx.getStorage({
      key: 'user',
      success: function (res) {
        // var index = e.currentTarget.dataset.index;
        // console.log(index)
        wx.navigateTo({
          url: '../want/want' 
        })

      },
      fail: function () {
        wx.showToast({
          title: '亲，在我的中授权才可使用',
          icon: 'none',
        })
      }
    })
  },
  allLife(){
    wx.navigateTo({
      url: '../all/all',

    })
  },
  moveMes(){
    wx.removeStorage({
      key: 'school',
      success: function(res) {
        wx.showToast({
          title: '清理成功',
        })
      },
    })
    wx.removeStorage({
      key: 'user',
      success(res) {
        wx.showToast({
          title: '清理成功',
        })
        wx.navigateTo({
          url: '../index/index',
        })
      }
    })
  },
  bindGetUserInfo(e){
   console.log(e)
   var name = e.detail.userInfo.nickName;
   var url = e.detail.userInfo.avatarUrl;
   var flag = true;
   wx.setStorage({
     key: 'user',
     data: {
       name,
       url,
       flag,
     },
     
   })
    wx.showToast({
      title: '授权成功',
    })
    var that = this;
    wx.getStorage({
      key: 'user',
      success: function (res) {
        console.log(res)
        var url = res.data.url;
        var name = res.data.name;
        var flag = res.data.flag;
        that.setData({
          url,
          name,
          flag,
        })
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    wx.getStorage({
      key: 'user',
      success: function (res) {
        console.log(res)
        var url = res.data.url;
        var name = res.data.name;
        var flag = res.data.flag
        that.setData({
          url,
          name,
          flag,
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
// miniprogram/pages/main/main.js
const db = wx.cloud.database();
const fen = db.collection('store-fen');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000
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
    var that = this;
    fen.orderBy('_id', 'asc').get({
      success(res) {
        // res.data 包含该记录的数据
        // console.log(res)
        var allcontent = res.data
        //  allcontent.reverse()
        // that.setData({
        //   fenContent:res.data
        // })
        for (let item of allcontent) {
          for (let i = 0; i < item.fileID.length; i++) {
            //  console.log(item.fileID[i])
            wx.cloud.downloadFile({
              fileID: item.fileID[i], // 文件 ID
              success: res => {
                // 返回临时文件路径
                //  console.log(res.tempFilePath)
                item.fileID[i] = res.tempFilePath
                that.setData({
                  allcontent,
                })
              },
              fail: console.error
            })
          }
        }

        console.log(allcontent)
      }

    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
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
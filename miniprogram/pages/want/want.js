var arr = [];
const db = wx.cloud.database();
const fen = db.collection('store-fen')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
  },

  phone() {
    var that = this;
    wx.showActionSheet({
      itemList: ['上传照片', '上传视频'],
      success(res) {
        console.log(res.tapIndex)
        that.setData({
          index: res.tapIndex
        })
        if (res.tapIndex === 0) {
          wx.chooseImage({
            count: 6, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
              // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
              var tempFilePaths = res.tempFilePaths
              console.log(tempFilePaths)
              that.setData({
                tempFilePaths,
                
                flag: true
              })

              
            }

          })
          
        } else {
          wx.chooseVideo({
            sourceType: ['album', 'camera'],
            maxDuration: 60,
            camera: 'back',
            success(res) {
              console.log(res.tempFilePath)
              that.setData({
                tempFilePath: res.tempFilePath,
                flag: true
              })
            }
          })
        }
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })






  },
  input(e) {
    console.log(e)
    this.setData({
      title: e.detail.value,

    })
  },
  submit() {
    var that = this;

    if (this.data.flag) {
      const filePaths = this.data.tempFilePaths;

      console.log(filePaths)
      new Promise((resolve,reject) =>{
      if(that.data.index ===0){

       for (let i = 0; i < filePaths.length; i++) {
        let filePath = filePaths[i];
        wx.cloud.uploadFile({
          cloudPath: `example${i}${Math.ceil(Math.random() * 10000000)}.${filePath.slice(-3)}`,
          filePath, // 文件路径
          success: res => {
            // get resource ID
            console.log(res.fileID)
            arr.push(res.fileID)
            console.log(arr)
            if (i === filePaths.length -1 ) {
              console.log(arr,'----')
              fen.add({

                data: {
                  fileID: arr,
                  title: that.data.title,
                  name: that.data.name,
                  userUrl: that.data.userUrl
                }
              })
            }
          },
          fail: err => {
            // handle error
          }
        })

       }
      } else{
        wx.cloud.uploadFile({
          cloudPath: `example${Math.ceil(Math.random() * 10000000)}.${that.data.tempFilePath.slice(-3)}`, // 上传至云端的路径
          filePath: that.data.tempFilePath, // 小程序临时文件路径
          success: res => {
            // 返回文件 ID
            console.log(res.fileID)
            fen.add({
              data: {
                fileID: res.fileID,
                title: that.data.title,
                name: that.data.name,
                userUrl: that.data.userUrl
              }
            })
          },
          fail: console.error
        })
     }
      resolve('wangc')
      }).then(() =>{
        arr=[];
        wx.switchTab({
          url: '../main/main',
        })
      })
      // setTimeout(() => {
      //   wx.switchTab({
      //     url: '../xianchi/index',
      //   })

      // }, 2000)
    
    } else {
      wx.showModal({
        title: '提示',
        content: '亲，请完成内容填写',
        showCancel: false
      })
    }
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
    wx.getUserInfo({
      success(res) {
        console.log(res)
        that.setData({
          name: res.userInfo.nickName,
          userUrl: res.userInfo.avatarUrl
        })
      }
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
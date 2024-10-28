const app = getApp();
Page({
  data: {
    backgroud: '',
    kftelphone: '',
    kfwechat: ''
  },

  // 页面加载时触发的函数
  async onLoad() {
    try {
      const backgroud = await app.request({
        url: 'getswiper',
        method: 'GET'
      }); 
     
      const kftelphone = await app.request({
        url: 'getsettingtext/kftelphone',
        method: 'GET'
      }); 

      const kfwechat = await app.request({
        url: 'getsettingtext/kfwechat',
        method: 'GET'
      }); 
      // 请求成功后更新数据
      this.setData({
        backgroud: backgroud.data.data[0],
        kftelphone: kftelphone.data.data,
        kfwechat: kfwechat.data.data
      });
    } catch (error) {
      console.error('Failed to fetch swiper list:', error);
    }
  },
  makephonecall(){
    wx.makePhoneCall({
      phoneNumber: this.data.kftelphone,
      success: function() {
        console.log('拨打电话成功');
      },
      fail: function() {
        console.log('拨打电话失败');
      }
    });
  },
  copyToClipboard() {
    wx.setClipboardData({
      data: this.data.kfwechat,
      success: function() {
        wx.showToast({
          title: '复制成功',
          icon: 'success',
          duration: 2000
        });
      },
      fail: function() {
        wx.showToast({
          title: '复制失败',
          icon: 'none',
          duration: 2000
        });
      }
    });
  },
  handleContact (e) {
    console.log(e.detail)
  }
});

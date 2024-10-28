const app = getApp();
Component({
  properties: {

  },
  data: {
    phonenumber: '',
    authcode: '',
    ischeck: false
  },
  methods: {
    close() {
      console.log("close")
      this.triggerEvent('close');
    },
    onphonenumberInput(e) {
      this.setData({ phonenumber: e.detail.value });
    },
    onPauthcodeInput(e) {
      this.setData({ authcode: e.detail.value });
    },
    onchangeisread(e){
      this.setData({
        isread: !isread
      })
    },
    isValidPhoneNumber(phoneNumber) {
      const phonePattern = /^1[3-9]\d{9}$/; // 正则表达式
      return phonePattern.test(phoneNumber); // 返回是否匹配
    },
    changecheck(e){
      console.log(e)
      this.setData({
        ischeck: e.detail.value.length > 0 
      })
    },
    async confirm() {
      const { phonenumber, authcode, ischeck } = this.data;
      console.log(ischeck)
      if(ischeck == false){
        wx.showToast({
          title: '请先阅读并同意隐私协议',
          icon: 'none'
        });
        return;
      }
      if(!this.isValidPhoneNumber(phonenumber)){
        wx.showToast({
          title: '手机号格式不正确',
          icon: 'none'
        });
        return;
      }
      
      // TODO: 在这里实现登录逻辑，例如调用接口
      if (phonenumber && authcode) {
        const res = await wx.login();
        console.log(res)
        const userid = await app.request({
          url: 'aplogin',
          method: 'POST',
          data:{
            code: res.code,
            phone: phonenumber,
            authcode: authcode
          }
        })
        console.log(userid)
        if(userid.data.id){
          wx.setStorageSync('user',userid.data.id)
          this.close()
        }else{
          wx.showToast({
            title: '验证码不存在',
            icon: 'none'
          });
        }
        
      } else {
        wx.showToast({
          title: '请填写手机号和认证码',
          icon: 'none'
        });
      }
    },
    touserAgreement(){
      wx.navigateTo({
        url: '/pages/agreement/userAgreement', 
        success: function() {
          console.log('跳转成功');
        },
        fail: function(err) {
          console.error('跳转失败', err);
        }
      });
    },
    toprivacyAgreement(){
      wx.navigateTo({
        url: '/pages/agreement/privacyAgreement', 
        success: function() {
          console.log('跳转成功');
        },
        fail: function(err) {
          console.error('跳转失败', err);
        }
      });
    }
  },
  
});

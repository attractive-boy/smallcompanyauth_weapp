// app.js
App({
  // 当小程序初始化完成时触发（全局只触发一次）
  onLaunch: function () {
    console.log('App has launched');
  },

  // 封装 wx.request 为 Promise
  request: function (options) {
    const baseUrl = this.globalData.baseUrl; // 获取全局路径

    return new Promise((resolve, reject) => {
      wx.request({
        url: baseUrl + options.url,  // 拼接完整的请求路径
        method: options.method || 'GET',  // 设置请求方法，默认为 GET
        data: options.data || {},  // 传递请求参数
        header: options.header || {
          'Content-Type': 'application/json'  // 默认的请求头设置
        },
        success: (res) => {
          resolve(res); // 请求成功时，返回结果
        },
        fail: (err) => {
          reject(err); // 请求失败时，返回错误信息
        }
      });
    });
  },

  globalData: {
    baseUrl: 'https://www.wzbpgx.com/api/'  // 设置全局的 API 请求路径
  }
});

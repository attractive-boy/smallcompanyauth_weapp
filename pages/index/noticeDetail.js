const app = getApp();
Page({
  data: {
    content:''
  },

  // 页面加载时触发的函数
  async onLoad() {
    const id = this.options.id;
    try {
      const content = await app.request({
        url: 'announcements/' + id,
        method: 'GET'
      });
      const date = new Date(content.data.updated_at);

      const year = date.getUTCFullYear();
      const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // 月份从0开始
      const day = String(date.getUTCDate()).padStart(2, '0');
      const hours = String(date.getUTCHours()).padStart(2, '0');
      const minutes = String(date.getUTCMinutes()).padStart(2, '0');
      const seconds = String(date.getUTCSeconds()).padStart(2, '0');

      const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      content.data.updated_at = formattedDate

      // 请求成功后更新数据
      this.setData({
        content: content.data,
      });
    } catch (error) {
      console.error('Failed to fetch swiper list:', error);
    }
  }
});

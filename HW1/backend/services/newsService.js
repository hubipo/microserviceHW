const axios = require('axios');


const fetchNewsData = async (cityName) => {
  try {
    // 网易新闻 API 请求地址
    const url = `https://c.3g.163.com/nc/article/local/${encodeURIComponent(cityName)}/0-20.html`;
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36',
    };

    const response = await axios.get(url, { headers });
    const data = response.data;

    // 处理新闻数据
    if (data && data[cityName]) {
      const newsList = data[cityName];
      const newsData = newsList.map(news => ({
        title: news.title,
        url: news.url,
      }));

      return {
        title: cityName,
        news: newsData,
      };
    } else {
      throw new Error('City not found in Wangyi News API');
    }
  } catch (error) {
    throw new Error('Failed to fetch general city news data from Wangyi News API');
  }
};

module.exports = { fetchNewsData };

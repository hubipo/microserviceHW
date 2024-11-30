const axios = require('axios');
const cheerio = require('cheerio');

// Service to fetch general city data from Baidu Baike
const fetchCityData = async (cityName) => {
  try {
    const url = `https://baike.baidu.com/item/${encodeURIComponent(cityName)}`;
    const response = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"
      }
    });
    
    const $ = cheerio.load(response.data);

    // 找到 name="lemma-summary" 的 a 标签的父元素
    const lemmaSummaryParent = $('a[name="lemma-summary"]').parent();
    let textContent = '';

    // 在该父元素下查找所有具有 class="text_H038s" 的 span 元素并提取文本内容
    lemmaSummaryParent.find('span.text_H038s').each((index, element) => {
      textContent += $(element).text().trim() + ' ';
    });

    // 清理并格式化文本内容
    textContent = textContent.replace(/\[\d+\]/g, '').trim();

    const cityInfo = {
      title: cityName,
      extract: textContent || '暂无简介',
      url: url
    };

    return cityInfo;
  } catch (error) {
    throw new Error('Failed to fetch city data from Baidu Baike: ' + error.message);
  }
};

module.exports = { fetchCityData };

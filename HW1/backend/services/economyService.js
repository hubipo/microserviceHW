const axios = require('axios');

// Service to fetch economic city data from World Bank API
const fetchCityEconomyData = async (cityName) => {
  try {
    // 调用世界银行 API 获取经济相关信息
    const url = `https://search.worldbank.org/api/v2/wds?format=json&qterm=${encodeURIComponent(cityName)}&fl=docdt,count`;
    const response = await axios.get(url);
    const data = response.data;

    if (data.documents) {
      const resultList = [];

      for (let key in data.documents) {
        const value = data.documents[key];
        const displayTitle = value.display_title;
        const url = value.url;
        if (displayTitle && url) {
          resultList.push({ title: displayTitle, url });
        }
      }

      return resultList;
    } else {
      throw new Error('No economic data found for the given city');
    }
  } catch (error) {
    throw new Error('Failed to fetch city economic data from World Bank API');
  }
};

module.exports = { fetchCityEconomyData };

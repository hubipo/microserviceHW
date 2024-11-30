<template>  
  <div class="city-search-page">
    <aside class="sidebar">
      <nav>
        <ul>
          <li @click="currentView = 'general'" :class="{ active: currentView === 'general' }">基本信息</li>
          <li @click="currentView = 'economy'" :class="{ active: currentView === 'economy' }">经济信息</li>
          <li @click="currentView = 'weather'" :class="{ active: currentView === 'weather' }">天气预报</li>
          <li @click="currentView = 'tourist'" :class="{ active: currentView === 'tourist' }">旅游景点</li>
          <li @click="currentView = 'news'" :class="{ active: currentView === 'news' }">新闻</li>
          <li @click="currentView = 'map'" :class="{ active: currentView === 'map' }">地图</li>
        </ul>
      </nav>
    </aside>

    <main class="main-content">
      <div class="search-section">
        <input v-model="city" @keyup.enter="search" placeholder="输入城市名称" class="search-input" />
        <button @click="search" class="search-button">搜索</button>
      </div>

      <div v-if="loading" class="loading-section">加载中...</div>
      <div v-if="error" class="error-section">出错了: {{ error }}</div>

      <div v-if="!loading && !error && hasResults" class="result-section">
        <div v-if="currentView === 'general'" class="info-section my-animation-fade-in">
          <h3>基本信息</h3>
          <p>{{ generalInfo.title }} - {{ generalInfo.extract }}</p>
          <a :href="generalInfo.url" target="_blank" class="link">查看更多</a>
        </div>

        <div v-if="currentView === 'economy'" class="info-section my-animation-fade-in">
          <h3>经济信息</h3>
          <ul>
            <li v-for="item in economyInfo" :key="item.url">
              <a :href="item.url" target="_blank" class="link">{{ item.title }}</a>
            </li>
          </ul>
        </div>

        <!-- 修改后的天气表格显示 -->
        <div v-if="currentView === 'weather'" class="info-section my-animation-fade-in">
          <h3>天气预报</h3>
          <table class="weather-table">
            <thead>
              <tr>
                <th>日期</th>
                <th>白天天气</th>
                <th>夜间天气</th>
                <th>最高温度</th>
                <th>最低温度</th>
                <th>风向</th>
                <th>风力</th>
                <th>紫外线指数</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(weather, index) in weatherInfo.slice(0, 3)" :key="index">
                <td>{{ getDayLabel(index) }}</td>
                <td>{{ weather.textDay }}</td>
                <td>{{ weather.textNight }}</td>
                <td>{{ weather.tempMax }}℃</td>
                <td>{{ weather.tempMin }}℃</td>
                <td>{{ weather.windDirDay }}</td>
                <td>{{ weather.windScaleDay }}</td>
                <td>{{ weather.uvIndex }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-if="currentView === 'tourist'" class="info-section my-animation-fade-in">
          <h3>旅游景点</h3>
          <ul>
            <li v-for="spot in touristInfo" :key="spot.name">
              {{ spot.name }} - 地址: {{ spot.address }} ({{ spot.area }}), 电话: {{ spot.telephone }}
            </li>
          </ul>
        </div>

        <div v-if="currentView === 'news'" class="info-section my-animation-fade-in">
          <h3>新闻</h3>
          <ul>
            <li v-for="newsItem in newsInfo.news" :key="newsItem.url">
              <a :href="newsItem.url" target="_blank" class="link">{{ newsItem.title }}</a>
            </li>
          </ul>
        </div>

        <div v-if="currentView === 'map'" class="map-full-section my-animation-fade-in">
          <h3>地图</h3>
          <div ref="mapContainer" id="map-container"></div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CitySearch',
  data() {
    return {
      city: '',
      generalInfo: null,
      economyInfo: null,
      weatherInfo: null,
      touristInfo: null,
      newsInfo: null,
      loading: false,
      error: null,
      currentView: 'general',
      map: null,  // 用于保存地图实例
      cityCoordinates: null, // 城市经纬度
    };
  },
  computed: {
    hasResults() {
      return this.generalInfo || this.economyInfo || this.weatherInfo || this.touristInfo || this.newsInfo;
    }
  },
  methods: {
    async search() {
      if (!this.city.trim()) {
        this.$router.push({ path: '/results', query: { city: this.city } });
        return;
      }
      this.loading = true;
      this.error = null;
      this.generalInfo = null;
      this.economyInfo = null;
      this.weatherInfo = null;
      this.touristInfo = null;
      this.newsInfo = null;
      this.cityCoordinates = null;

      try {
        const [generalRes, economyRes, weatherRes, touristRes, newsRes, locationRes] = await Promise.all([
          axios.get(`/api/city/general/${this.city}`),
          axios.get(`/api/city/economy/${this.city}`),
          axios.get(`/api/city/weather/${this.city}`),
          axios.get(`/api/city/tourist/${this.city}`),
          axios.get(`/api/city/news/${this.city}`),
          axios.get(`/api/city/location/${this.city}`),
        ]);

        this.generalInfo = generalRes.data;
        this.economyInfo = economyRes.data;
        this.weatherInfo = weatherRes.data;
        this.touristInfo = touristRes.data;
        this.newsInfo = newsRes.data;
        this.cityCoordinates = [parseFloat(locationRes.data.longitude), parseFloat(locationRes.data.latitude)];

        if (this.currentView === 'map') {
          this.updateMap();
        }
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    getDayLabel(index) {
      switch (index) {
        case 0:
          return '今天';
        case 1:
          return '明天';
        case 2:
          return '后天';
        default:
          return '';
      }
    },
    loadMapScript() {
      return new Promise((resolve) => {
        if (typeof window.AMap !== 'undefined') {
          resolve();
          return;
        }
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `https://webapi.amap.com/maps?v=1.4.15&key=881f79d9bcb3d58aaf6004896e856a06`;
        script.onload = () => {
          resolve();
        };
        document.head.appendChild(script);
      });
    },
    async initializeMap() {
      await this.loadMapScript();
      if (this.$refs.mapContainer) {
        this.map = new window.AMap.Map(this.$refs.mapContainer, {
          resizeEnable: true,
          zoom: 11,
          center: this.cityCoordinates || [116.397428, 39.90923],
        });
      }
    },
    async updateMap() {
      if (this.map) {
        this.map.destroy();
        this.map = null;
      }
      await this.initializeMap();
    },
  },
  watch: {
    currentView(newVal) {
      if (newVal === 'map') {
        this.updateMap();
      }
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

.city-search-page {
  display: flex;
  min-height: 100vh;
  background-color: #f0f4f7;
  font-family: 'Roboto', sans-serif;
}

.sidebar {
  width: 15%;
  background-color: #3fcea1;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar li {
  margin: 10px 0;
  padding: 10px;
  color: white;
  cursor: pointer;
  text-align: center;
  transition: background-color 0.3s ease;
}

.sidebar li.active, .sidebar li:hover {
  background-color: #2ea789;
}

.main-content {
  width: 85%;
  padding: 40px;
  background-color: white;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.search-section {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.search-input {
  flex: 1;
  padding: 10px;
  border: 2px solid #ced4da;
  border-radius: 5px;
  font-size: 16px;
}

.search-button {
  padding: 10px 20px;
  background-color: #3fcea1;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.search-button:hover {
  background-color: #2ea789;
}

.result-section {
  margin-top: 20px;
}

.info-section {
  padding: 16px;
  background-color: #f0f0f0;
}

.weather-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.weather-table th, .weather-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

.weather-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.weather-table td {
  font-size: 14px;
}

.weather-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.map-full-section {
  width: 100%;
  height: 500px;
}

#map-container {
  width: 100%;
  height: 100%;
}

.link {
  color: #3fcea1;
  text-decoration: none;
  font-weight: bold;
}

.link:hover {
  text-decoration: underline;
}

.loading-section,
.error-section {
  margin-top: 20px;
  color: red;
}

.my-animation-fade-in {
  animation: fade-in 0.5s ease-out forwards;
}

@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

// src/App.vue
<template>
  <CitySearch />
</template>

<script>
import CitySearch from './components/CitySearch.vue';//这里编译器可能会检测大小写出错，可忽略

export default {
  name: 'App',
  components: {
    CitySearch, // 确保 CitySearch 组件已经被导入并注册
  },
};
</script>

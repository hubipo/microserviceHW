const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',  // 代理目标为后端 API 的地址和端口
        changeOrigin: true,
      },
    },
  },
});

const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === 'production'
  ? '/vue-test/public'
  : '/',
  transpileDependencies: true
})

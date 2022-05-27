const { defineConfig } = require('@vue/cli-service')
const path = require('path');

module.exports = defineConfig(
  {

    transpileDependencies: true,
    configureWebpack: {
        resolve: {
            alias: {
                'styles': path.resolve('./src/assets/css')
            }
        }
    }

  }
)

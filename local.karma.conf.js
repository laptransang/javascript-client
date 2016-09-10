const webpack = require('webpack');

module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha/qunit/...)
    // as well as any additional frameworks (requirejs/chai/sinon/...)
    frameworks: [
      'tap'
    ],

    // list of files / patterns to load in the browser
    files: [
      'src/*/__tests__/**/*.spec.js'
    ],

    // list of files / patterns to exclude
    exclude: [
      'src/*/__tests__/**/node.spec.js'
    ],

    // prepare code for the browser using webpack
    preprocessors: {
      'src/*/__tests__/**/*.spec.js': ['webpack']
    },

    webpack: {
      // devtool: 'cheap-module-inline-source-map',
      module: {
        loaders: [
          { test: /\.js$/, exclude: /node_modules/, loader: 'babel' }
        ]
      },
      plugins: [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('test'),
          __DEV__: true
        })
      ],
      node: {
        fs: 'empty'
      }
    },

    webpackServer: {
      noInfo: true
    },

    // web server port
    port: 8080,

    // make IE happy (in theory not required)
    // https://msdn.microsoft.com/en-us/library/ff955275(v=vs.85).aspx
    customHeaders: [{
      match: 'html',
      name: 'X-UA-Compatible',
      value: 'IE=edge'
    }],

    // you can define custom flags
    customLaunchers: {
      'PhantomJS_custom': {
        base: 'PhantomJS',
        debug: true
      }
    },

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      'Chrome',
      // 'Firefox',
      // 'Safari',
      // 'PhantomJS'
      // 'PhantomJS_custom'
    ],

    // Which plugins to enable
    plugins: [
      'karma-*'
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_DISABLE,

    coverageReporter: {
      type : 'html',
      dir : 'karma_coverage/'
    },

    reporters: [
      'coverage'
    ]
  });
};

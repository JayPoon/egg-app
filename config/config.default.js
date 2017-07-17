'use strict';

module.exports = appInfo => {
  const config = {
    proxyworker: {
      port: 10086,
    },
    security: {
      csrf: {
        enable: false,
        ignore: appInfo => {
          console.log(appInfo);
        }
      }
    }
  };

  // should change to your own
  config.keys = appInfo.name + '_1500117583134_8692';

  // add your config here

  return config;
};

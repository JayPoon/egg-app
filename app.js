'use strict';

module.exports = app => {

    app.beforeStart(function* () {
        // 应用会等待这个函数执行完成才启动
        console.info('Server is ready to start, please wait...');
    });
    app.beforeClose(function* () {
        // 应用会等待这个函数执行完成才启动
        console.info('Server is ready to close, please wait...');
    });
};

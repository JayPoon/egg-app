'use strict';
module.exports = {
    ERRCODE: {
        UNKNOWN: 10, // 未知错误
        SYS_ERR: 12, // 系统繁忙，请稍后重试
        REQ_PARAM_ERR: 22, // 请求参数错误
        INVOKE_OTHER_SYS_ERR: 25 // 请求外部系统错误
    }
};

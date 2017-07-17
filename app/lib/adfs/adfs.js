'use strict';
const hasha = require('hasha');
const assert = require('assert');
const request = require('request-promise');
const util = require('util');
const crypto = require('crypto');

class Adfs {

    constructor(config) {
        this.config = config;
    }

    /**
     * 跳转到ADFS登录页面
     * @param {string} redirectURL 登录成功后跳转的URL.
     * @param {Response} response Eggjs(Koa)的Response对象.
     * @memberof Adfs
     * @see Response#redirect
     */
    toLoginPage(redirectURL, response) {
        const url = this.createLoginUrl(redirectURL);
        response.redirect(url);
    }
    /**
     * 创建ADFS登录地址
     * @param {string} redirectURL url to redirect after login succeed.
     * @return {string} The login url of ADFS with redirect url.
     * @memberof Adfs
     */
    createLoginUrl(redirectURL) {
        const { appId, ssoUrl } = this.config;
        return ssoUrl + '?a=' + appId + '&r=' + redirectURL;
    }

    createInfoUrl(token) {
        const { appId, tokenUrl } = this.config;
        return tokenUrl + '?AppID=' + appId + '&Token=' + token;
    }

    getToken(request) {
        return request.query.Token;
    }

    * getAccountInfo(token) {
        if (token) {
            const infoUrl = this.createInfoUrl(token);
            const data = yield request.get(infoUrl);

            console.log('[Adfs.getAccountInfo][token:%s][data:%s]', token, data);
        }
    }

    desctypt(key, content) {

    }

    sign() {
        const { appid, appsecret } = this.config.portalapis;
        const timestamp = Math.round(new Date().getTime());// 获取时间戳（毫秒），如要获取秒得/1000
        const str = timestamp + appid + appsecret;
        const hash = hasha(str, { algorithm: 'md5' }).toString().toUpperCase();// 将时间戳+appid+appSercer进行MD5哈希并转换为大写
        const signs = appid + '_' + timestamp + '_' + hash;// 定义变量
        // console.log('sign:%s', signs);
        return signs;
    }


    /**
     * 请假记录明细
     * @param {string} EMPLID employ id ex. 0010114
     * @param {string} TRANSACTION_NBR trx number given by hris
     * @return {Promise} Promise of request.
     */
    hris_leave_details(EMPLID, TRANSACTION_NBR) {
        // if (1===1) {
        //     throw new Error(10, 'test error');
        // }
        const path = '/proxy/hris/leave/detail/v1';
        return this.hris_commom_details_request(path, 'INF_Leave', EMPLID, TRANSACTION_NBR);
    }

}


module.exports = Adfs;

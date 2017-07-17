'use strict';
const hasha = require('hasha');
const assert = require('assert');
const request = require('request-promise');
const util = require('util');

class PortalApis {

    constructor(config) {
        this.config = config;
        this.baseurl = this.config.baseurl;
        assert(this.baseurl, '[PortalApis.baseurl] is undefined.');
    }

    sign() {
        const { appid, appsecret } = this.config;
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

    /**
     * 加班记录明细
     * @param {string} EMPLID employ id ex. 0010114
     * @param {string} TRANSACTION_NBR trx number given by hris
     * @return {Promise} Promise of request.
     */
    hris_ot_details(EMPLID, TRANSACTION_NBR) {
        const path = '/proxy/hris/workot/detail/v1';
        return this.hris_commom_request(path, 'INF_OT', EMPLID, TRANSACTION_NBR);
    }

    /**
     * 加班确认记录明细
     * @param {string} EMPLID employ id ex. 0010114
     * @param {string} TRANSACTION_NBR trx number given by hris
     * @return {Promise} Promise of request.
     */
    hris_otcf_details(EMPLID, TRANSACTION_NBR) {
        const path = '/proxy/hris/workotcf/detail/v1';
        return this.hris_commom_request(path, 'INF_OTCF', EMPLID, TRANSACTION_NBR);
    }

    /**
     * 销假记录明细
     * @param {string} EMPLID employ id ex. 0010114
     * @param {string} TRANSACTION_NBR trx number given by hris
     * @return {Promise} Promise of request.
     */
    hris_revocation_details(EMPLID, TRANSACTION_NBR) {
        const path = '/proxy/hris/workot/detail/v1';
        return this.hris_commom_request(path, 'INF_OTCF', EMPLID, TRANSACTION_NBR);
    }

    /**
     * 打卡异常记录明细
     * @param {string} EMPLID employ id ex. 0010114
     * @param {string} TRANSACTION_NBR trx number given by hris
     * @return {Promise} Promise of request.
     */
    hris_pubab_details(EMPLID, TRANSACTION_NBR) {
        const path = '/proxy/hris/abnormal_punch/detail/v1';
        return this.hris_commom_details_request(path, 'INF_OTCF', EMPLID, TRANSACTION_NBR);
    }

    hris_leave_list(EMPLID, BGN_DT, END_DT, PIN_TAKE_NUM, WF_STATUS) {
        let url = this.baseurl + 'proxy/hris/workot/list/v1?app_signature=%s';
        url = util.format(url, this.sign());

        const form = {
            PRCS_ID: 'INF_Leave',
            PRCS_ID_SUB: 'Header',
            EMPLID,
            BGN_DT,
            END_DT,
            PIN_TAKE_NUM,
            WF_STATUS
        };
        return request.post({
            url,
            form
        });
    }

    hris_commom_details_request(PATH, PRCS_ID, EMPLID, TRANSACTION_NBR) {
        let url = this.baseurl + PATH + '?app_signature=%s';
        url = util.format(url, this.sign());
        const form = {
            PRCS_ID_SUB: 'Details',
            PRCS_ID,
            EMPLID,
            TRANSACTION_NBR
        };
        return request.post({
            url,
            form
        });
    }
}

const PortalConstants = {
    ERRCODE: {
        UNKNOWN: 10, // 未知错误
        SYS_ERR: 12, // 系统繁忙，请稍后重试
        REQ_ERR: 22 // 请求参数错误
    },
    RESP_CODE: {
        HRIS_CODE_SUCC: '10',
    }
};

module.exports = {
    PortalApis,
    PortalConstants
};

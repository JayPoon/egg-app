'use strict';
const { PortalApis, PortalConstants } = require('../lib/portalapis');
const AppConstants = require('../lib/constants');

const CALL = Symbol('AttendanceController#call');


module.exports = app => {

    const methodMapping = {
        leave: 'hris_leave_details',
        ot: 'hris_ot_details',
        otcf: 'hris_otcf_details',
        revocation: 'hris_lrevocation_details',
        pubab: 'hris_pubab_details'
    };

    class AttendanceController extends app.Controller {

        constructor(ctx) {
            super(ctx);
            this.portalapis = new PortalApis(this.config.portalapis);
        }

        * leave() {
            yield this[CALL]('leave');
        }
        * ot() {
            yield this[CALL]('ot');
        }
        * otcf() {
            yield this[CALL]('otcf');
        }
        * revocation() {
            yield this[CALL]('revocation');
        }
        * pubab() {
            yield this[CALL]('pubab');
        }

        * [CALL](method) {

            // this.portalapis = new Portalapis(this.config);

            const api = methodMapping[method];

            const { request, response } = this.ctx;

            let resp = {};
            // 获取请求的参数值
            const { empid, trxnum } = request.query;

            try {

                this.logger.info('[AttendanceController.%s][call portalapis.%s][empid=%s][trxnum=%s]'
                    , method, api, empid, trxnum);

                const resposeBody = yield this.portalapis[api](empid, trxnum);

                this.logger.debug('[AttendanceController.%s][resposeBody: %s', method, resposeBody);

                const data = JSON.parse(resposeBody);

                if (data.result) {
                    const root = data.data['soapenv:Body'].root;
                    if (root.CODE === PortalConstants.RESP_CODE.HRIS_CODE_SUCC) {
                        resp.data = root.DATA;
                        resp = this._buildSuccessResp(root.DATA);

                    } else {
                        resp = this._buildFailResp(AppConstants.ERRCODE.INVOKE_OTHER_SYS_ERR, root.MESSAGE);
                    }
                } else {
                    resp = this._buildFailResp(AppConstants.ERRCODE.INVOKE_OTHER_SYS_ERR, data.message);

                }
            } catch (error) {
                this.logger.error('[AttendanceController.%s][Error:%s]', method, error.toString());
                resp = this._buildFailResp(AppConstants.ERRCODE.SYS_ERR, error.toString());
                throw error;
            }

            response.body = resp;
        }

        /* private method */
        _buildSuccessResp(data) {
            const resp = {
                result: true,
                data
            };
            return resp;
        }
        _buildFailResp(errcode, errmsg) {
            const resp = {
                result: false,
                errcode,
                errmsg
            };
            return resp;
        }
    }


    return AttendanceController;
};

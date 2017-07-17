'use strict';

const Adfs = require('../lib/adfs').Adfs;
const jwt = require('jwt-simple');
const _ = require('lodash');

module.exports = app => {
    class SsoController extends app.Controller {

        constructor(ctx) {
            super(ctx);
            this.Adfs = new Adfs(this.config.adfs);
        }

        async login() {
            this.ctx.body = 'login';
            const { request, response } = this.ctx;
            // response.header.Location = 'http://www.baidu.com';
            // console.log(response.header);

            let cbURL = request.query.cb;

            if (cbURL) {
                if (_.startsWith(cbURL, '/')) {
                    cbURL = request.origin + cbURL;
                }
            }

            const redirectURL = request.origin + '/sso/token?cb=' + cbURL;
            this.Adfs.toLoginPage(redirectURL, response);


        }

        * token() {

            const { request, response } = this.ctx;
            const token = request.body.Token;
            this.logger.info('Get Token:', request.body.Token);

            const userinfo = yield this.Adfs.getAccountInfo(token);


            const payload = { userinfo, token };
            const secret = 'QsJ90';

            // 生成jwt token
            const jwttoken = jwt.encode(payload, secret);

            // 跳转地址
            const cb = request.query.cb;


            if (cb) {
                response.redirect(cb + '?token=' + jwttoken);
            }

            // this.ctx.body = 'hi, egg';

        }
        genJwtToken() {

        }
    }
    return SsoController;
};

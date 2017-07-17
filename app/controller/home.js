'use strict';

module.exports = app => {
  class HomeController extends app.Controller {
    * index() {
      // this.ctx.body = 'hi, egg';

      this.ctx.response.headers['WWW-Authenticate'] = 'Basic realm="No authorization"';
      this.ctx.response.headers.Location = 'www.baidu.com"';
    }
  }
  return HomeController;
};

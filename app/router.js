'use strict';

module.exports = app => {
  app.get('/', 'home.index');

  app.get('/sso/token', 'sso.token');
  app.post('/sso/token', 'sso.token');

  app.get('/sso/login', 'sso.login');
  // 请假记录
  app.get('/api/leave', 'attendance.leave');
  // 销假记录
  app.get('/api/revocation', 'attendance.revocation');
  // 加班记录
  app.get('/api/ot', 'attendance.ot');
  // 加班确认记录
  app.get('/api/otcf', 'attendance.otcf');
  // 打卡异常记录
  app.get('/api/pubab ', 'attendance.pubab');

};
